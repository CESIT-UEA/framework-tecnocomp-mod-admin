import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/interfaces/user';

@Component({
  selector: 'app-layout-menu',
  templateUrl: './layout-menu.component.html',
  styleUrls: ['./layout-menu.component.css'],
})
export class LayoutMenuComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  isDrawerOpen: boolean = true;
  currentPageTitle: string = '';

  toggleDrawer() {
    this.drawer.toggle();
    this.isDrawerOpen = this.drawer.opened;
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setPageTitle();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getCurrentRouteTitle())
      )
      .subscribe((title: string) => {
        this.currentPageTitle = title || 'Sem título';
      });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUsuarioDados(): User {
    return this.authService.getUsuarioDados();
  }

  private getCurrentRouteTitle(): string {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.data['title'];
  }

  private setPageTitle(): void {
    this.currentPageTitle = this.getCurrentRouteTitle() || 'Sem título';
  }
}
