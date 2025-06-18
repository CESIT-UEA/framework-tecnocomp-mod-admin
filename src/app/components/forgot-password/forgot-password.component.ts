import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApiAdmService } from 'src/app/services/api-adm.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
    email = new FormControl('');
    
    constructor(public ApiAdmService: ApiAdmService){}

    submit(){
        this.ApiAdmService.enviarEmailSenhaEsquecida(this.email.value!).subscribe(data =>{
          console.log(data)
        })
        this.email.reset()
    }
}
