import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { VerAoVivoService } from 'src/app/services/ver-ao-vivo.service';
import { User } from 'src/interfaces/user';


@Component({
  selector: 'app-header-topico',
  templateUrl: './header-topico.component.html',
  styleUrls: ['./header-topico.component.css']
})
export class HeaderTopicoComponent {
  constructor(
    public verAoVivoService: VerAoVivoService,
    private authService: AuthService,
    public apiAdmService:ApiAdmService
  ) {}
    
  getUsuarioDados(): User{
    return this.authService.getUsuarioDados();
  }
}
