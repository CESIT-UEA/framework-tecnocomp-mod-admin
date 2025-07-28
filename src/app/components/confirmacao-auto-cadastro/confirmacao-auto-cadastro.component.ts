import { ApiAdmService } from 'src/app/services/api-adm.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacao-auto-cadastro',
  templateUrl: './confirmacao-auto-cadastro.component.html',
  styleUrls: ['./confirmacao-auto-cadastro.component.css']
})
export class ConfirmacaoAutoCadastroComponent {
    formConfirmarCadastro: FormGroup = new FormGroup({
        email: new FormControl('', Validators.required),
        codigo: new FormControl('', Validators.required)
    })

    constructor(private apiAdmService: ApiAdmService, private router: Router){}

    submit(){
      if (this.formConfirmarCadastro.valid){
        this.apiAdmService.confirmarAutoRegister(this.formConfirmarCadastro.value).subscribe({
          next: (dados) => {
            this.apiAdmService.message('Usuário criado com sucesso')
            this.router.navigate(['/login'])
          },
          error: (err) => {
            console.error('Erro ao criar usuário', err)
          }
        })
      }
    }

}
