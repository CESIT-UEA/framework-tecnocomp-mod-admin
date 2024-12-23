import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/interfaces/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Any initialization logic can go here
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUsuarioDados(): User{
    return this.authService.getUsuarioDados();
  }
}
