import { ApiAdmService } from './../../services/api-adm.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { senhaForte } from '../validators/validators';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent {
  validators: boolean = false;
  errorCadastro: boolean = false;

  cadastroForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(13)]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8), senhaForte()]),
    tipo: new FormControl('adm', Validators.required)
  });

  constructor(private apiService: ApiAdmService, private router: Router) {
      this.cadastroForm.valueChanges.subscribe(()=>{
          this.errorCadastro = false
      })
  }


  get nome(){
      return this.cadastroForm.get('nome')!;
  }

  get email(){
      return this.cadastroForm.get('email')!;
  }

  get senha(){
    return this.cadastroForm.get('senha')!;
}


  onSubmit() {
    if (this.cadastroForm.valid) {
      this.apiService.registerUsuario(this.cadastroForm.value).subscribe(
        response => {
          console.log('Usuário cadastrado com sucesso:', response);
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.errorCadastro = true
          console.error('Erro ao cadastrar usuário:', error);
        }
      );
    }
    if(!this.cadastroForm.valid){
      this.validators = true
 }
  }
  home(){
    this.router.navigate(['/dashboard']);
  }
}
