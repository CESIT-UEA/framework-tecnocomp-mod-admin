import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAdmService } from 'src/app/services/api-adm.service';

@Component({
  selector: 'app-cadastro-topico',
  templateUrl: './cadastro-topico.component.html',
  styleUrls: ['./cadastro-topico.component.css']
})
export class CadastroTopicoComponent {
  dadosBasicosFormGroup: FormGroup;
  videoUrlsFormGroup: FormGroup;
  saibaMaisFormGroup: FormGroup;
  referenciasFormGroup: FormGroup;
  exerciciosFormGroup: FormGroup;

  idModulo!: number;
  letras: string[] = ['A','B','C','D']
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiAdmService,
    private router: Router
  ) {
    // Inicializando os grupos de formulários
    this.dadosBasicosFormGroup = this.fb.group({
      nome_topico: ['', Validators.required],
      textoApoio: [''],
      ebookUrlGeral: ['']
    });

    this.videoUrlsFormGroup = this.fb.group({
      videoUrls: this.fb.array([this.fb.control('', Validators.required)])
    });

    this.saibaMaisFormGroup = this.fb.group({
      saibaMais: this.fb.array([
        this.fb.group({
          descricao: ['', Validators.required],
          url: ['', Validators.required]
        })
      ])
    });

    this.referenciasFormGroup = this.fb.group({
      referencias: this.fb.array([
        this.fb.group({
          caminhoDaImagem: ['', Validators.required],
          referencia: ['', Validators.required]
        })
      ])
    });

    this.exerciciosFormGroup = this.fb.group({
      exercicios: this.fb.array([
        this.fb.group({
          questao: ['', Validators.required],
          alternativas: this.fb.array(
            new Array(4).fill(null).map(() =>
              this.fb.group({
                descricao: ['', Validators.required],
                explicacao: ['', Validators.required],
                correta: [false]
              })
            )
          )
        })
      ])
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.idModulo = +params['id_modulo'];
      console.log(this.idModulo, ' = idModulo')
      if (!this.idModulo) {
        alert('ID do módulo não encontrado! Redirecionando...');
        this.router.navigate(['/modulos']);
      }
    });
  }

  get videoUrls(): FormArray {
    return this.videoUrlsFormGroup.get('videoUrls') as FormArray;
  }

  get saibaMais(): FormArray {
    return this.saibaMaisFormGroup.get('saibaMais') as FormArray;
  }

  get referencias(): FormArray {
    return this.referenciasFormGroup.get('referencias') as FormArray;
  }

  get exercicios(): FormArray {
    return this.exerciciosFormGroup.get('exercicios') as FormArray;
  }

  alternativas(index: number): FormArray {
    return this.exercicios.at(index).get('alternativas') as FormArray;
  }

  adicionarVideoUrl(): void {
    this.videoUrls.push(this.fb.control('', Validators.required));
  }

  removerVideoUrl(index: number): void {
    if (this.videoUrls.length > 1) {
      this.videoUrls.removeAt(index);
    }
  }

  adicionarSaibaMais(): void {
    this.saibaMais.push(
      this.fb.group({
        descricao: ['', Validators.required],
        url: ['', Validators.required]
      })
    );
  }

  removerSaibaMais(index: number): void {
    if (this.saibaMais.length > 1) {
      this.saibaMais.removeAt(index);
    }
  }

  adicionarReferencia(): void {
    this.referencias.push(
      this.fb.group({
        caminhoDaImagem: ['', Validators.required],
        referencia: ['', Validators.required]
      })
    );
  }

  removerReferencia(index: number): void {
    if (this.referencias.length > 1) {
      this.referencias.removeAt(index);
    }
  }

  adicionarExercicio(): void {
    this.exercicios.push(
      this.fb.group({
        questao: ['', Validators.required],
        alternativas: this.fb.array(
          new Array(4).fill(null).map(() =>
            this.fb.group({
              descricao: ['', Validators.required],
              explicacao: ['', Validators.required],
              correta: [false]
            })
          )
        )
      })
    );
  }

  setAlternativaCorreta(exercicioIndex: number, alternativaIndex: number): void {
    const alternativasArray = this.alternativas(exercicioIndex);
    alternativasArray.controls.forEach((alt, index) => {
      alt.get('correta')?.setValue(index === alternativaIndex);
    });
  }

  isAlternativaCorretaValida(): boolean {
    return this.exercicios.controls.every((exercicio) =>
      (exercicio.get('alternativas') as FormArray).controls.some(
        (alt) => alt.get('correta')?.value === true
      )
    );
  }

  removerExercicio(index: number): void {
    this.exercicios.removeAt(index);
  }

  limparAlternativa(exercicioIndex: number, alternativaIndex: number): void {
    const alternativa = this.alternativas(exercicioIndex).at(alternativaIndex);
    alternativa.reset({ descricao: '', explicacao: '', correta: false });
  }

  onSubmit(): void {
    const topicoCompleto = {
      ...this.dadosBasicosFormGroup.value,
      videoUrls: this.videoUrlsFormGroup.value.videoUrls,
      saibaMais: this.saibaMaisFormGroup.value.saibaMais,
      referencias: this.referenciasFormGroup.value.referencias,
      exercicios: this.exerciciosFormGroup.value.exercicios,
      id_modulo: this.idModulo
    };

    this.apiService.cadastrarTopico(topicoCompleto).subscribe(
      () => {
        alert('Tópico cadastrado com sucesso!');
        this.router.navigate(['/modulos', this.idModulo]);
      },
      (error) => {
        console.error('Erro ao cadastrar tópico:', error);
        alert('Erro ao cadastrar tópico.');
      }
    );
  }
}
