import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiAdmService } from 'src/app/services/api-adm.service';

@Component({
  selector: 'app-cadastro-plataforma',
  templateUrl: './cadastro-plataforma.component.html',
  styleUrls: ['./cadastro-plataforma.component.css'],
})
export class CadastroPlataformaComponent {
  plataformaForm = new FormGroup({
    plataformaUrl: new FormControl('', Validators.required),
    plataformaNome: new FormControl('', Validators.required),
    idCliente: new FormControl('', Validators.required),
    usuario_id: new FormControl(''),
    temaTipo: new FormControl('padrao', Validators.required),
    customPrimaria: new FormControl(''),
    customSecundaria: new FormControl(''),
    customTerciaria: new FormControl(''),
    customQuartenaria: new FormControl(''),
    customQuintenaria: new FormControl(''),
  });

  constructor(
    private apiService: ApiAdmService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioId = this.authService.getUsuarioId();
    this.plataformaForm.patchValue({ usuario_id: `${usuarioId}` });
  }

  get plataformaUrl() {
    return this.plataformaForm.get('plataformaUrl')!;
  }

  get plataformaNome() {
    return this.plataformaForm.get('plataformaNome')!;
  }

  get idCliente() {
    return this.plataformaForm.get('idCliente')!;
  }

  onSubmit(): void {
    if (this.plataformaForm.valid) {
      this.apiService.registerPlataforma(this.plataformaForm.value).subscribe(
        (response) => {
          console.log('Plataforma registrada com sucesso:', response);
          this.irParaPagePlataformas();
        },
        (error) => {
          console.error('Erro ao registrar plataforma:', error);
        }
      );
    }
  }

  irParaPagePlataformas() {
    if (this.authService.isAdmin()){
      this.router.navigate(['/tecnocomp/plataformas']);
    } else {
      this.router.navigate(['/tecnocomp/minhas-plataformas'])
    }
  }
}
