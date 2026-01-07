import { UploadService } from './../../services/upload.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { Modulo } from 'src/interfaces/modulo/Modulo';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-registro-modulo',
  templateUrl: './registro-modulo.component.html',
  styleUrls: ['./registro-modulo.component.css']
})
export class RegistroModuloComponent {
  renamedFile!: File;
  nomePasta!: string;
  baseUrlFile: string = `https://tecnocomp.uea.edu.br/ebooks`;
  urlApiRag: string = 'https://tecnocomp.uea.edu.br:5678/webhook/upload-file'

  moduloForm = new FormGroup({
    nome_modulo: new FormControl('', Validators.required),
    nome_url: new FormControl('', Validators.required),
    ebookUrlGeral: new FormControl(''),
    video_inicial: new FormControl('')
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
        filesDoModulo: this.moduloForm.get('nome_url')?.value
      };

      // verifica se tem arquivo e faz tratamento do nome
      if (this.selectedFile){
            const originalName = this.selectedFile.name;
            const extension = originalName.substring(originalName.lastIndexOf('.'));
            const nameWithoutExtension = originalName.substring(0, originalName.lastIndexOf('.'));
            const uuid = uuidv4();

            const sanitizedOriginalName = nameWithoutExtension
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')    
                .replace(/\s+/g, '_')
                .replace(/[^a-zA-Z0-9_-]/g, ''); 

            const uniqueFileName = `${sanitizedOriginalName}-${uuid}${extension}`

            this.renamedFile = new File([this.selectedFile], uniqueFileName, { type: this.selectedFile.type })

            const nomeModuloAmigavel = this.moduloForm.get('nome_url')?.value || '';

            this.nomePasta = `${nomeModuloAmigavel}-${uuid}`
            modulo.filesDoModulo = this.nomePasta
            modulo.ebookUrlGeral = `${this.baseUrlFile}/${this.nomePasta}/${this.renamedFile.name}`
      }

      this.apiService.registerModulo(modulo).subscribe({
        next: response => {
           // verifica se tem arquivo e faz upload
        if (this.selectedFile && this.renamedFile && this.nomePasta){
            this.uploadService.uploadFile(
              this.renamedFile, 
              this.nomePasta, 
              `${this.uploadService.baseURL}/api/modulos/upload`
        ).subscribe({
            next: () => {
              // faz upload de arquivo para o fluxo do n8n vetorizar
              this.uploadFileRAG(this.renamedFile, this.nomePasta, this.urlApiRag).subscribe({
                next: () => {
                  console.log(`Upload para RAG realizado com sucesso`)
                }, error: (err) => {
                  console.error(`Erro ao realizar upload para RAG`, err)
              }})
              console.log('Upload realizado com sucesso!');
            },
            error: err => {
              console.error('Erro no upload:', err);
              alert('O módulo foi cadastrado, mas o upload do arquivo falhou.');
          }
        })
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


  uploadFileRAG(file: File, nomeModulo: string, url: string){
    return this.uploadService.uploadFile(file, nomeModulo, url)
  }

}
