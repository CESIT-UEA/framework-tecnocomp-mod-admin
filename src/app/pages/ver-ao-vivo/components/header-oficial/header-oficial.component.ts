import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { VerAoVivoService } from 'src/app/services/ver-ao-vivo.service';
import { User } from 'src/interfaces/user';

@Component({
  selector: 'app-header-oficial',
  templateUrl: './header-oficial.component.html',
  styleUrls: ['./header-oficial.component.css'],
})
export class HeaderOficialComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public verAoVivoService: VerAoVivoService,
    private authService: AuthService
  ) {}

    getUsuarioDados(): User{
      return this.authService.getUsuarioDados();
    }
}
