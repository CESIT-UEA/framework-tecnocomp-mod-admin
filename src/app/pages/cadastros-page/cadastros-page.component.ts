import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-cadastros-page',
  templateUrl: './cadastros-page.component.html',
  styleUrls: ['./cadastros-page.component.css']
})
export class CadastrosPageComponent {
    constructor(private authService: AuthService){}

    isAdmin(): boolean{
      return this.authService.isAdmin();
    }
}
