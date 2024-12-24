import { Component, OnInit } from '@angular/core';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { User } from 'src/interfaces/user';

@Component({
  selector: 'app-usuarios-page',
  templateUrl: './usuarios-page.component.html',
  styleUrls: ['./usuarios-page.component.css']
})
export class UsuariosPageComponent implements OnInit {
  usuarios: User[] = [];
  constructor(private userService: ApiAdmService){}

  ngOnInit(): void {
    this.userService.listarUsers().subscribe(
      (response) => {
        this.usuarios = response;
        console.log(response)
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

}
