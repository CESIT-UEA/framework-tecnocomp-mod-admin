import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/interfaces/user';

@Component({
  selector: 'app-layout-menu',
  templateUrl: './layout-menu.component.html',
  styleUrls: ['./layout-menu.component.css']
})
export class LayoutMenuComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  isDrawerOpen: boolean = true;

  toggleDrawer() {
    this.drawer.toggle();
    this.isDrawerOpen = this.drawer.opened;
  }
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUsuarioDados(): User{
    return this.authService.getUsuarioDados();
  }
}
