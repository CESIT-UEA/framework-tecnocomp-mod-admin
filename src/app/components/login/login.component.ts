import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorLogin: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) {
      this.loginForm.valueChanges.subscribe(() => {
      this.errorLogin = false;
    });
  }


  get email(){
      return this.loginForm.get('email')!;
  }

  get senha(){
      return this.loginForm.get('senha')!;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.errorLogin = false;

      this.authService.login(this.loginForm.value.email!, this.loginForm.value.senha!).subscribe(
        (response: any) => {
          console.log(response);

          // Salva o accessToken no localStorage
          this.authService.setToken(response.accessToken);

          // Decodifica o accessToken
          const usuarioDados = this.authService.decodeToken(response.accessToken);

          if (usuarioDados) {
            // Salva os dados do usuário no localStorage
            this.authService.setUsuario(usuarioDados);

            // Navega para o dashboard
            this.router.navigate(['/dashboard']);
            console.log(this.authService.getUsuarioDados());
          } else {
            this.errorLogin = true;
            console.error('Erro: Access Token inválido ou corrompido.');
          }
        },
        (error) => {
          this.errorLogin = true;
          console.error('Erro ao fazer login:', error);
        }
      );
    }
  }


}
