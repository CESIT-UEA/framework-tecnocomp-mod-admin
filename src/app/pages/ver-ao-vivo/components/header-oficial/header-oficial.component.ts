import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { VerAoVivoService } from 'src/app/services/ver-ao-vivo.service';
import { User } from 'src/interfaces/user';

@Component({
  selector: 'app-header-oficial',
  templateUrl: './header-oficial.component.html',
  styleUrls: ['./header-oficial.component.css'],
})
export class HeaderOficialComponent implements OnInit {
  constructor(
    public verAoVivoService: VerAoVivoService,
    private authService: AuthService,
    public apiAdmService:ApiAdmService
  ) {}

  ngOnInit(): void {
      this.verAoVivoService.getDadosCompletos()
  }

    getUsuarioDados(): User{
      return this.authService.getUsuarioDados();
    }
}
