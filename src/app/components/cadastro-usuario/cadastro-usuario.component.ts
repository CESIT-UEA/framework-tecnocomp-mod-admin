import { ApiAdmService } from './../../services/api-adm.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent {
  cadastroForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
    tipo: new FormControl('adm', Validators.required)
  });

  constructor(private apiService: ApiAdmService, private router: Router) {}

  onSubmit() {
    if (this.cadastroForm.valid) {
      this.apiService.registerUsuario(this.cadastroForm.value).subscribe(
        response => {
          console.log('Usuário cadastrado com sucesso:', response);
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Erro ao cadastrar usuário:', error);
        }
      );
    }
  }
  home(){
    this.router.navigate(['/dashboard']);
  }
}
