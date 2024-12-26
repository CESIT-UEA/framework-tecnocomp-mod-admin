import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiAdmService } from 'src/app/services/api-adm.service';

@Component({
  selector: 'app-registro-modulo',
  templateUrl: './registro-modulo.component.html',
  styleUrls: ['./registro-modulo.component.css']
})
export class RegistroModuloComponent {
  moduloForm = new FormGroup({
    nome_modulo: new FormControl('', Validators.required),
    nome_url: new FormControl('', Validators.required),
    ebookUrlGeral: new FormControl(''),
    video_inicial: new FormControl(''),
    plataforma_id: new FormControl('', Validators.required)
  });

  constructor(private apiService: ApiAdmService, private router: Router,private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.moduloForm.valid) {
      const modulo = {
        nome_modulo: this.moduloForm.get('nome_modulo')?.value,
        nome_url: this.moduloForm.get('nome_url')?.value,
        ebookUrlGeral: this.moduloForm.get('ebookUrlGeral')?.value,
        video_inicial: this.moduloForm.get('video_inicial')?.value,
        plataforma_id: this.moduloForm.get('plataforma_id')?.value,
        usuario_id: this.authService.getUsuarioDados().id,
      };

      // Chamar o serviço para registrar o módulo
      this.apiService.registerModulo(modulo).subscribe(
        response => {
          console.log('Módulo cadastrado com sucesso:', response);
          this.router.navigate(['/dashboard']); // Redireciona após salvar
        },
        error => {
          console.error('Erro ao cadastrar módulo:', error);
        }
      );
    } else {
      console.error('Formulário inválido. Verifique os campos obrigatórios.');
    }
  }

}
