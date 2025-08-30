import { UploadService } from './../../services/upload.service';
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
  });

  selectedFile: File | null = null

  constructor(
    private apiService: ApiAdmService, 
    private router: Router, 
    private authService: AuthService,
    private uploadService: UploadService
  ) {}

  gerarUrlAmigavel(): void {
    const nomeModulo = this.moduloForm.get('nome_modulo')?.value || '';

    const urlAmigavel = nomeModulo
      .toLowerCase()
      .normalize("NFD").replace(/\p{Diacritic}/gu, "")
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/-+/g, '-');

    this.moduloForm.patchValue({ nome_url: urlAmigavel });
  }

  onSubmit(): void {
    if (this.moduloForm.valid) {
      const modulo = {
        nome_modulo: this.moduloForm.get('nome_modulo')?.value,
        nome_url: this.moduloForm.get('nome_url')?.value,
        ebookUrlGeral: this.moduloForm.get('ebookUrlGeral')?.value,
        video_inicial: this.moduloForm.get('video_inicial')?.value,
        usuario_id: this.authService.getUsuarioDados().id,
        
      };

      this.apiService.registerModulo(modulo).subscribe({
        next: response => {
          if (this.selectedFile){
          this.uploadService.uploadFile(this.selectedFile, 'modulos').subscribe(
            {
              next: (response) => {
                console.log(response)
              }
            }
          )
        }
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          console.error('Erro ao cadastrar módulo:', err);
        }
    });
    } else {
      console.error('Formulário inválido. Verifique os campos obrigatórios.');
    }
  }

  onSelectedFile(event: any){
    const file = event.target.files[0];
    if (file){
      this.selectedFile = file
    }
  }

}
