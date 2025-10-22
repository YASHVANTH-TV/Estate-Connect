import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const userRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const expectedRole = route.data['role'];

    if (token && userRole === expectedRole) {
      return true;
    }

    if (!token) {
      return this.router.parseUrl('/login');
    } else {
      return this.router.parseUrl('/unauthorized');
    }
  }
}