import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'angularapp';
  userRole: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getRoleObservable().subscribe((result) => {
      console.log("User Role: " + result)
      this.userRole = result;
    })
  }
}