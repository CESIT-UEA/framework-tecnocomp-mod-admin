import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { Modulo } from 'src/interfaces/modulo/Modulo';

@Component({
  selector: 'app-editar-modulo',
  templateUrl: './editar-modulo.component.html',
  styleUrls: ['./editar-modulo.component.css'],
})
export class EditarModuloComponent {
  moduloForm: FormGroup = new FormGroup({
    nome_modulo: new FormControl('', Validators.required),
    nome_url: new FormControl('', Validators.required),
    ebookUrlGeral: new FormControl(''),
    video_inicial: new FormControl(''),
  });
  moduloId!: number;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiAdmService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.moduloId = +this.route.snapshot.paramMap.get('id')!;
    this.carregarModulo();
  }

  carregarModulo(): void {
    this.apiService.obterModuloPorId(this.moduloId).subscribe(
      (modulo: Modulo) => {
        console.log(modulo);
        this.moduloForm.patchValue({
          nome_modulo: modulo.nome_modulo,
          nome_url: modulo.nome_url,
          ebookUrlGeral: modulo.ebookUrlGeral,
          video_inicial: modulo.video_inicial,
        });
      },
      (error) => console.error('Erro ao carregar módulo:', error)
    );
  }

  onSubmit(): void {
    if (this.moduloForm.valid) {
      this.apiService
        .atualizarModulo(this.moduloId, this.moduloForm.value)
        .subscribe(
          () => {
            this.apiService.message('Módulo atualizado com sucesso!');
            if (this.authService.isAdmin()) {
              this.router.navigate(['/modulos']);
            } else if (this.authService.isProfessor()) {
              this.router.navigate(['/meus-modulos']);
            }
          },
          (error) => console.error('Erro ao atualizar módulo:', error)
        );
    }
  }

  gerarUrlAmigavel(): void {
    const nomeModulo = this.moduloForm.get('nome_modulo')?.value || '';

    const urlAmigavel = nomeModulo
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/-+/g, '-');

    this.moduloForm.patchValue({ nome_url: urlAmigavel });
  }
}
