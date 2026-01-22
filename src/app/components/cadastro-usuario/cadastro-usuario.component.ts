import { ApiAdmService } from './../../services/api-adm.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { noOnlyWhitespace, senhaForte } from '../validators/validators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  validators: boolean = false;
  errorCadastro: boolean = false;
  buttonDisabled = true;
  hide = false;

  cadastroForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(10), noOnlyWhitespace()]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(13), noOnlyWhitespace()]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8), senhaForte(), noOnlyWhitespace()]),
    confirmarSenha: new FormControl('',[Validators.required,Validators.minLength(8), senhaForte(),noOnlyWhitespace()]),
    tipo: new FormControl('professor', Validators.required)
  });

  constructor(private apiService: ApiAdmService, private router: Router, private authService: AuthService) {
      this.cadastroForm.valueChanges.subscribe(()=>{
          this.errorCadastro = false

          const form = this.cadastroForm.value
          if (form.nome?.trim().length != 0 && form.email?.trim().length != 0 && form.senha?.trim().length != 0){
            this.buttonDisabled = false
          }else{
            this.buttonDisabled = true
          }
      })
  }

  ngOnInit(): void {
  
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


  isAdminUser(){
    const tipoUser = this.authService.getUsuarioDados().tipo;
    return tipoUser === "adm"
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      console.log(this.cadastroForm.value)
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
