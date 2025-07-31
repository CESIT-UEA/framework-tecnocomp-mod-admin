import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { ExercicioService } from 'src/app/services/exercicio.service';

@Component({
  selector: 'app-editar-topico',
  templateUrl: './editar-topico.component.html',
  styleUrls: ['./editar-topico.component.css']
})
export class EditarTopicoComponent implements OnInit{
  dadosBasicosFormGroup: FormGroup;
  videoUrlsFormGroup: FormGroup;
  saibaMaisFormGroup: FormGroup;
  referenciasFormGroup: FormGroup;
  exerciciosFormGroup: FormGroup;
  idModulo!: number;
  letras: string[] = ['A','B','C','D']
  idTopico!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiAdmService,
    private router: Router,
    private exercicioService: ExercicioService
  ) {
    this.dadosBasicosFormGroup = this.fb.group({
      nome_topico: ['', Validators.required],
      textoApoio: [''],
      ebookUrlGeral: [''],
    });

    this.videoUrlsFormGroup = this.fb.group({
      videoUrls: this.fb.array([this.fb.control('', Validators.required)]),
    });

    this.saibaMaisFormGroup = this.fb.group({
      saibaMais: this.fb.array([
        this.fb.group({
          descricao: ['', Validators.required],
          url: ['', Validators.required],
        }),
      ]),
    });

    this.referenciasFormGroup = this.fb.group({
      referencias: this.fb.array([
        this.fb.group({
          caminhoDaImagem: ['', Validators.required],
          referencia: ['', Validators.required],
        }),
      ]),
    });

    this.exerciciosFormGroup = this.fb.group({
      exercicios: this.fb.array([
        this.fb.group({
          questao: ['', Validators.required],
          alternativas: this.fb.array([
            this.criarAlternativa(),
            this.criarAlternativa(),
            this.criarAlternativa(),
            this.criarAlternativa(),
          ]),
        }),
      ]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idTopico = +params['id'];
      this.carregarDadosDoTopico(this.idTopico);
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

  alternativas(exercicioIndex: number): FormArray {
    return (this.exercicios.get(exercicioIndex.toString()) as FormGroup).get('alternativas') as FormArray;
  }

  carregarDadosDoTopico(id: number): void {
    this.apiService.obterTopicoPorId(id).subscribe(
      (topico) => {
        console.log(topico)
        this.dadosBasicosFormGroup.patchValue({
          nome_topico: topico.nome_topico,
          textoApoio: topico.textoApoio,
          ebookUrlGeral: topico.ebookUrlGeral,
        });

        this.setVideoUrls(topico.VideoUrls);
        this.setSaibaMais(topico.SaibaMais);
        this.setReferencias(topico.Referencias);
        this.setExercicios(topico.Exercicios);
      },
      (error) => {
        console.error('Erro ao carregar tópico:', error);
        alert('Erro ao carregar os dados do tópico.');
      }
    );
  }

  setVideoUrls(videoUrls: any[]): void {
    this.videoUrls.clear();
    videoUrls.forEach((url) => this.videoUrls.push(this.fb.control(url.url, Validators.required)));
  }

  setSaibaMais(saibaMais: any[]): void {
    this.saibaMais.clear();
    saibaMais.forEach((sm) =>
      this.saibaMais.push(
        this.fb.group({
          descricao: [sm.descricao, Validators.required],
          url: [sm.url, Validators.required],
        })
      )
    );
  }

  setReferencias(referencias: any[]): void {
    this.referencias.clear();
    referencias.forEach((ref) =>
      this.referencias.push(
        this.fb.group({
          caminhoDaImagem: [ref.caminhoDaImagem, Validators.required],
          referencia: [ref.referencia, Validators.required],
        })
      )
    );
  }

  setExercicios(exercicios: any[]): void {
    this.exercicios.clear();
    exercicios.forEach((exercicio) => {
      this.exercicios.push(
        this.fb.group({
          questao: [exercicio.questao, Validators.required],
          alternativas: this.fb.array(
            (exercicio.Alternativas || []).map((alt: any) =>
              this.fb.group({
                descricao: [alt.descricao, Validators.required],
                explicacao: [alt.explicacao, Validators.required],
                correta: [alt.correta]
              })
            )
          )
        })
      );
    });
  }

  setAlternativaCorreta(exercicioIndex: number, alternativaIndex: number): void {
    const alternativasArray = this.alternativas(exercicioIndex);
    alternativasArray.controls.forEach((alt, index) => {
      alt.get('correta')?.setValue(index === alternativaIndex);
    });
  }
  isAlternativaCorretaValida(): boolean {
    return this.exercicios.controls.every((exercicio) => {
      const alternativas = exercicio.get('alternativas') as FormArray;
      return alternativas.controls.some((alt) => alt.get('correta')?.value === true);
    });
  }


  criarAlternativa(): FormGroup {
    return this.fb.group({
      descricao: ['', Validators.required],
      explicacao: ['', Validators.required],
      correta: [false],
    });
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
        url: ['', Validators.required],
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
        referencia: ['', Validators.required],
      })
    );
  }

  removerReferencia(index: number): void {
    if (this.referencias.length > 1) {
      this.referencias.removeAt(index);
    }
  }

  limparAlternativa(exercicioIndex: number, alternativaIndex: number): void {
    const alternativa = this.alternativas(exercicioIndex).at(alternativaIndex);
    alternativa.reset({ descricao: '', explicacao: '', correta: false });
  }

  onSubmit(): void {
    const topicoEditado = {
      ...this.dadosBasicosFormGroup.value,
      videoUrls: this.videoUrls.value,
      saibaMais: this.saibaMais.value,
      referencias: this.referencias.value,
      exercicios: this.exercicios.value,
    };

    this.apiService.editarTopico(this.idTopico, topicoEditado).subscribe(
      (response) => {
        alert('Tópico atualizado com sucesso!');
        console.log(response)
        const idModulo = response.id_modulo;
        this.router.navigate(['/modulos', idModulo]);
      },
      (error) => {
        console.error('Erro ao atualizar tópico:', error);
        alert('Erro ao atualizar tópico.');
      }
    );
  }


  setQuestaoAberta(valor: boolean){
    this.exercicioService.setQuestaoAberta(this.idTopico, valor).subscribe()
  }

}
