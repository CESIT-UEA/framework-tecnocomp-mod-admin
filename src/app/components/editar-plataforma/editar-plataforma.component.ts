import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { Plataforma } from 'src/interfaces/Plataforma';

@Component({
  selector: 'app-editar-plataforma',
  templateUrl: './editar-plataforma.component.html',
  styleUrls: ['./editar-plataforma.component.css'],
})
export class EditarPlataformaComponent implements OnInit {
  plataformaForm!: FormGroup;
  plataformaId!: number;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiAdmService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obter o ID da plataforma a partir da rota
    this.plataformaId = Number(this.route.snapshot.paramMap.get('id'));

    // Inicializar o formulário
    this.plataformaForm = this.fb.group({
      plataformaNome: ['', [Validators.required, Validators.minLength(3)]],
      plataformaUrl: [
        '',
        [Validators.required, Validators.pattern(/https?:\/\/.+/)],
      ],
      idCliente: ['', [Validators.required]],
      temaTipo: ['padrao', Validators.required],
      customPrimaria: [''],
      customSecundaria: [''],
      customTerciaria: [''],
      customQuartenaria: [''],
      customQuintenaria: [''],
    });

    // Carregar os dados da plataforma
    this.apiService.obterPlataformaPorId(this.plataformaId).subscribe(
      (plataforma: Plataforma) => {
        console.log(plataforma);
        this.plataformaForm.patchValue(plataforma);
      },
      (error) => {
        console.error('Erro ao carregar a plataforma:', error);
        alert('Erro ao carregar os dados da plataforma.');
        this.router.navigate(['/plataformas']);
      }
    );
  }

  salvarAlteracoes(): void {
    if (this.plataformaForm.invalid) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const plataformaAtualizada = this.plataformaForm.value;

    this.apiService
      .editarPlataforma(this.plataformaId, plataformaAtualizada)
      .subscribe(
        () => {
          alert('Plataforma atualizada com sucesso!');
          this.router.navigate(['/plataformas']);
        },
        (error) => {
          console.error('Erro ao atualizar a plataforma:', error);
          alert('Erro ao atualizar a plataforma.');
        }
      );
  }
}
