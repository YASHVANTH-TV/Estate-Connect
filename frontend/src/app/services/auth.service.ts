import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL: string = environment.apiUrl;

  private roleSubject = new BehaviorSubject<string | null>(null);
  private firstNameSubject = new BehaviorSubject<string | null>(null);

  constructor(private client: HttpClient) {
    const storedRole = localStorage.getItem('role');
    const storedfirstName = localStorage.getItem('firstName');

    if (storedRole) {
      this.roleSubject.next(storedRole);
    }

    if (storedfirstName) {
      this.firstNameSubject.next(storedfirstName);
    }
  }

  register(user: User): Observable<any> {
    return this.client.post(`${this.API_URL}/auth/register`, user);
  }

  login(login: Login): Observable<any> {
    return this.client.post(`${this.API_URL}/auth/login`, login).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('firstName', response.firstName);
          localStorage.setItem('userId', response.userId);

          this.roleSubject.next(response.role);
          this.firstNameSubject.next(response.firstName);
        }
      })
    );
  }

  logout() {
    localStorage.clear();
    this.roleSubject.next(null);
    this.firstNameSubject.next(null);
  }

  getRoleObservable(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }
}