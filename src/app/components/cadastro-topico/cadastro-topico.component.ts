import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { UploadService } from 'src/app/services/upload.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-cadastro-topico',
  templateUrl: './cadastro-topico.component.html',
  styleUrls: ['./cadastro-topico.component.css']
})
export class CadastroTopicoComponent {
  dadosBasicosFormGroup: FormGroup;
  videoUrlsFormGroup: FormGroup;
  saibaMaisFormGroup: FormGroup;
  exerciciosFormGroup!: FormGroup;
  isQuestaoAberta!: boolean;

  selectedFile: File | null = null
  renamedFile!: File;
  baseUrlFile: string = `https://tecnocomp.uea.edu.br/ebooks`;
  pastaModulo: string | null = null;

  idModulo!: number;
  letras: string[] = ['A','B','C','D']
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiAdmService,
    private router: Router,
    private uploadService: UploadService
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


    this.exerciciosFormGroup = this.fb.group({
    exercicios: this.fb.array([
      this.fb.group({
        questao: ['', Validators.required],
        alternativas: this.fb.array([]) // garante que existe
      })
    ])
  });


    this.dadosBasicosFormGroup.valueChanges.subscribe(form => {
      localStorage.setItem('dadosBasicosFormGroup', JSON.stringify(form))
    })

    this.videoUrlsFormGroup.valueChanges.subscribe(form => {
      localStorage.setItem('videoUrls', JSON.stringify(form))
    })

    this.saibaMaisFormGroup.valueChanges.subscribe(form => {
      localStorage.setItem('saibaMais', JSON.stringify(form))
    })

    this.exerciciosFormGroup.valueChanges.subscribe(form => {
    localStorage.setItem('exerciciosFormGroup', JSON.stringify(form));
  });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.idModulo = +params['id_modulo'];
      
      if (!this.idModulo) {
        alert('ID do módulo não encontrado! Redirecionando...');
        this.router.navigate(['/modulos']);
      }
    });
    const STORAGE_KEY = `topico_rascunho_modulo_${this.idModulo}`;
    


    this.getDadosBasicosFormStorage()
    this.getVideoUrlsStorage();
    this.getSaibaMaisStorage();
    this.getExercicioStorage()
  }

  

  getDadosBasicosFormStorage(){
    const dadosBasicosFormGroup = localStorage.getItem('dadosBasicosFormGroup');

    if (dadosBasicosFormGroup) {
      this.dadosBasicosFormGroup.patchValue(JSON.parse(dadosBasicosFormGroup));
    }
  }

  get videoUrls(): FormArray {
    return this.videoUrlsFormGroup.get('videoUrls') as FormArray;
  }

  getVideoUrlsStorage(){
    const videoUrls = localStorage.getItem('videoUrls');

    if (videoUrls) {
      const dados = JSON.parse(videoUrls);

      this.videoUrls.clear();

      dados.videoUrls.forEach((url: string) => {
        this.videoUrls.push(this.fb.control(url, Validators.required));
      });
    }
  }

  get saibaMais(): FormArray {
    return this.saibaMaisFormGroup.get('saibaMais') as FormArray;
  }

  getSaibaMaisStorage() {
     const saibaMais = localStorage.getItem('saibaMais');
    if (saibaMais){
      const dados = JSON.parse(saibaMais);
      
      this.saibaMais.clear()

      dados.saibaMais.forEach((item: any) => {
        this.saibaMais.push(this.criarSaibaMaisGrupo(item))
      })
    }
  }

  get exercicios(): FormArray {
    return this.exerciciosFormGroup.get('exercicios') as FormArray;
  }

  getExercicioStorage(){
    const exerciciosFormGroup = localStorage.getItem('exerciciosFormGroup');
    if (!exerciciosFormGroup) return;

    const dados = JSON.parse(exerciciosFormGroup!);
    if (!dados?.exercicios?.length) return;

    const exercicio = dados.exercicios.at(0);

    const isObjetiva = Array.isArray(exercicio.alternativas) && exercicio.alternativas.length > 0;

    if (!isObjetiva) {
      this.exercicios.setControl(0, this.fb.group({
        questao: [''],
        isQuestaoAberta: [true],
        respostaEsperada: ['']
      }));
    } else {
      this.exercicios.setControl(0, this.fb.group({
        questao: [''],
        isQuestaoAberta: [false],
        alternativas: this.fb.array(
          exercicio.alternativas.map(() =>
            this.fb.group({
              descricao: [''],
              explicacao: [''],
              correta: [false]
            })
          )
        )
      }));
    }
    this.exerciciosFormGroup.patchValue(dados);
  
    this.isQuestaoAberta = !isObjetiva;
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

  criarSaibaMaisGrupo(data?: any): FormGroup {
    return this.fb.group({
      descricao: [data?.descricao || '', Validators.required],
      url: [data?.url || '', Validators.required]
    });
  }

  removerSaibaMais(index: number): void {
    if (this.saibaMais.length > 1) {
      this.saibaMais.removeAt(index);
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
      exercicios: this.exerciciosFormGroup.value.exercicios,
      id_modulo: this.idModulo
    };
    
    // referencias: this.referenciasFormGroup.value.referencias,
    
    if (this.selectedFile){
            const originalName = this.selectedFile.name;
            const extension = originalName.substring(originalName.lastIndexOf('.'));
            const uuid = uuidv4();

            const sanitizedOriginalName = originalName
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')    
                .replace(/\s+/g, '_')
                .replace(/[^a-zA-Z0-9_-]/g, ''); 

            const uniqueFileName = `${sanitizedOriginalName}-${uuid}${extension}`

            this.renamedFile = new File([this.selectedFile], uniqueFileName, { type: this.selectedFile.type })

            this.apiService.obterModuloPorId(this.idModulo).subscribe({
              next: (modulo) => {
                this.pastaModulo = modulo.filesDoModulo!;
                topicoCompleto.ebookUrlGeral = `${this.baseUrlFile}/${this.pastaModulo}/${this.renamedFile.name}`
                this.apiService.cadastrarTopico(topicoCompleto).subscribe({
                  next: () => {
                    this.uploadService.uploadFile(this.renamedFile, this.pastaModulo!, `${this.uploadService.baseURL}/api/modulos/upload`).subscribe({
                      next: () => {
                        alert('Tópico cadastrado com sucesso!');
                        this.router.navigate(['/modulos', this.idModulo]);
                      }
                    })
                  },
                  error: (error) => {
                    console.error('Erro ao cadastrar tópico:', error);
                    alert('Erro ao cadastrar tópico.');
                  }}
                );
              },
              error: (err) => {
                console.error('Erro ', err)
              }
            })

      }
  }

  criarQuestaoObjetiva(index: number){
    const questaoAtual = this.exercicios.at(index).get('questao')?.value;
    console.log(questaoAtual)

    this.isQuestaoAberta = false;

    
    // this.removerExercicio(index)

    // this.exercicios.push(this.fb.group({
    //   exercicios: this.fb.array([
    //     this.fb.group({
    //       questao: [questaoAtual, Validators.required],
    //       isQuestaoAberta: [this.isQuestaoAberta],
    //       respostaEsperada: [''],
    //       alternativas: this.fb.array(
    //         new Array(4).fill(null).map(() =>
    //           this.fb.group({
    //             descricao: ['', Validators.required],
    //             explicacao: ['', Validators.required],
    //             correta: [false]
    //           })
    //         )
    //       )
    //     })
    //   ])
    // }));


    this.exercicios.setControl(
    index,
    this.fb.group({
      questao: [questaoAtual, Validators.required],
      isQuestaoAberta: [false],
      respostaEsperada: [''],
      alternativas: this.fb.array(
        new Array(4).fill(null).map(() =>
          this.fb.group({
            descricao: ['', Validators.required],
            explicacao: ['', Validators.required],
            correta: [false]
          })
        )
      )
    }))
    
  }


  criarQuestaoDiscursiva(index: number){
    const questaoAtual = this.exercicios.at(index).get('questao')?.value;

    this.isQuestaoAberta = true;

    // this.exercicios.push(this.fb.group({
    //   exercicios: this.fb.array([
    //     this.fb.group({
    //       questao: [questaoAtual, Validators.required],
    //       isQuestaoAberta: [this.isQuestaoAberta],
    //       respostaEsperada: ['', Validators.required],
    //       alternativas: this.fb.array([])
    //     })
    //   ])
    // }));
    console.log(this.exercicios.value[0].isQuestaoAberta)

    this.exercicios.setControl(
    index,
    this.fb.group({
      questao: [questaoAtual, Validators.required],
      isQuestaoAberta: [true],
      respostaEsperada: ['', Validators.required],
      alternativas: this.fb.array([]) // existe, mas vazia
    })
  );
  }

  onSelectedFile(event: any){
    const file = event.target.files[0];
    if (file){
      this.selectedFile = file
    }
  }

}
