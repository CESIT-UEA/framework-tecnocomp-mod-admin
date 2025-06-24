import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiAdmService } from 'src/app/services/api-adm.service';

@Component({
  selector: 'app-auto-cadastro',
  templateUrl: './auto-cadastro.component.html',
  styleUrls: ['./auto-cadastro.component.css']
})
export class AutoCadastroComponent {
  errorLogin: boolean = false;
    focus = false;
  
    hide = true;
    cadastroForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required),
      confirmarSenha: new FormControl('', Validators.required)
    });
  
    constructor(private apiService: ApiAdmService) {}
  
  
    get nome(){
      return this.cadastroForm.get('nome')
    }

    get email(){
        return this.cadastroForm.get('email')!;
    }
  
    get senha(){
        return this.cadastroForm.get('senha')!;
    }

    get confirmarSenha(){
      return this.cadastroForm.get('confirmarSenha')!;
    }


    onSubmit(){
        if (this.cadastroForm.valid && this.senha.value === this.confirmarSenha.value){
          const dados = {nome: this.nome?.value, email: this.email.value, senha: this.senha.value}
          this.apiService.autoRegister(dados).subscribe(dados => {
              console.log(dados)
          })
        }
    }

}
