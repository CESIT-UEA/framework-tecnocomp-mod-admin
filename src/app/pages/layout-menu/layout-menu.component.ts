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

  isAdmin: boolean = false;
  isProfessor: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const usuario = this.getUsuarioDados();
    console.log(usuario);

    this.isAdmin = usuario?.tipo === 'adm';
    this.isProfessor = usuario?.tipo === 'professor';

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

  toggleDrawer() {
    this.drawer.toggle();
    this.isDrawerOpen = this.drawer.opened;
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
