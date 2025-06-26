import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAdmService } from 'src/app/services/api-adm.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
    submitted = false;
    email = new FormControl('', [Validators.required, Validators.email]);
    
    constructor(public ApiAdmService: ApiAdmService, private router: Router){}

    campoNotPreenchido(){
        const campoNotPreenchido = this.email.errors?.['required']
        return campoNotPreenchido
    }

    submit(){
      this.submitted = true;
      if (this.email.valid){
        this.ApiAdmService.enviarEmailSenhaEsquecida(this.email.value!).subscribe(data =>{
            if (data.sucess){
                this.ApiAdmService.message("Uma link para refinir sua senha foi enviado para seu Email!")
                this.router.navigate(['/login'])
            } 
            this.email.reset()
        }, (error)=>{
            this.ApiAdmService.message("Email não encontrado. Tente novamente!")
        })
      }        
    }
}
