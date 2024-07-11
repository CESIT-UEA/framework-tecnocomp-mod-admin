import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiAdmService } from './api-adm.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
  
export class FormularioComponent implements OnInit {
  formulario: FormGroup;

  constructor(private appService: ApiAdmService) {
    this.formulario = new FormGroup({
      nomeCliente: new FormControl('', Validators.required),
      urlLms: new FormControl('', Validators.required),
      plataformaNome: new FormControl('', Validators.required),
      idCliente: new FormControl('', Validators.required),
      desejaCadastrarModulo: new FormControl(false),
      nomeModulo: new FormControl(''),
      videoInicial: new FormControl(''),
      topicos: new FormArray([])
    });
  }

  ngOnInit(): void {}

  get topicos(): FormArray {
    return this.formulario.get('topicos') as FormArray;
  }

  adicionarTopico(): void {
    const topicoGroup = new FormGroup({
      nome_topico: new FormControl('', Validators.required),
      ebookUrlGeral: new FormControl(''),
      textoApoio: new FormControl(''),
      videoUrls: new FormControl(''), // Será transformado em array no backend
      saibaMais: new FormControl(''), // Será transformado em array no backend
      referencias: new FormControl(''), // Será transformado em array no backend
      exercicios: new FormArray([])
    });
    this.topicos.push(topicoGroup);
  }

  removerTopico(index: number): void {
    this.topicos.removeAt(index);
  }

  getExercicios(topicoIndex: number): FormArray {
    const topicoGroup = this.topicos.at(topicoIndex) as FormGroup;
    return topicoGroup.get('exercicios') as FormArray;
  }

  adicionarExercicio(topicoIndex: number): void {
    const exercicioGroup = new FormGroup({
      questao: new FormControl('', Validators.required),
      alternativas: new FormArray([])
    });
    this.getExercicios(topicoIndex).push(exercicioGroup);
  }

  removerExercicio(topicoIndex: number, exercicioIndex: number): void {
    this.getExercicios(topicoIndex).removeAt(exercicioIndex);
  }

  getAlternativas(topicoIndex: number, exercicioIndex: number): FormArray {
    const exerciciosArray = this.getExercicios(topicoIndex).at(exercicioIndex) as FormGroup;
    return exerciciosArray.get('alternativas') as FormArray;
  }

  adicionarAlternativa(topicoIndex: number, exercicioIndex: number): void {
    const alternativaGroup = new FormGroup({
      descricao: new FormControl('', Validators.required),
      explicacao: new FormControl(''),
      correta: new FormControl(false)
    });
    this.getAlternativas(topicoIndex, exercicioIndex).push(alternativaGroup);
  }

  removerAlternativa(topicoIndex: number, exercicioIndex: number, alternativaIndex: number): void {
    this.getAlternativas(topicoIndex, exercicioIndex).removeAt(alternativaIndex);
  }

  enviarFormulario(): void {
    if (this.formulario.valid) {
      const dadosLms = {
        nomeCliente: this.formulario.value.nomeCliente,
        url: this.formulario.value.urlLms,
        plataformaNome: this.formulario.value.plataformaNome,
        idCliente: this.formulario.value.idCliente
      };

      this.appService.cadastrarLms(dadosLms).subscribe(response => {
        console.log('LMS cadastrado:', response);

        if (this.formulario.value.desejaCadastrarModulo) {
          const topicos = this.topicos.value.map((topico: any) => ({
            ...topico,
            videoUrls: topico.videoUrls ? topico.videoUrls.split(',').map((url: string) => url.trim()) : [],
            saibaMais: topico.saibaMais ? topico.saibaMais.split(',').map((item: string) => {
              const [descricao, url] = item.split('|');
              return { descricao: descricao?.trim(), url: url?.trim() };
            }) : [],
            referencias: topico.referencias ? topico.referencias.split(',').map((item: string) => {
              const [caminhoDaImagem, referencia] = item.split('|');
              return { caminhoDaImagem: caminhoDaImagem?.trim(), referencia: referencia?.trim() };
            }) : [],
            exercicios: topico.exercicios.map((exercicio: any) => ({
              questao: exercicio.questao,
              alternativas: exercicio.alternativas.map((alt: any) => ({
                descricao: alt.descricao,
                explicacao: alt.explicacao,
                correta: alt.correta
              }))
            }))
          }));

          const dadosModulo = {
            nome_modulo: this.formulario.value.nomeModulo,
            video_inicial: this.formulario.value.videoInicial,
            topicos,
            idCliente: this.formulario.value.idCliente // Certifique-se de incluir idCliente aqui
          };

          this.appService.criarModulo(dadosModulo).subscribe(response => {
            console.log('Módulo e tópicos criados:', response);
          }, error => {
            console.error('Erro ao criar módulo e tópicos:', error);
          });
        }
      }, error => {
        console.error('Erro ao cadastrar LMS:', error);
      });
    } else {
      console.log('Preencha todos os campos');
    }
  }
}
