import { Component, OnInit } from '@angular/core';
import { VerAoVivoService } from 'src/app/services/ver-ao-vivo.service';

@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.css']
})
export class AtividadeComponent implements OnInit{
  exercicio!: any;
  selecionado: boolean[] = [false, false, false, false];
  exibirDescricao: boolean = false
  gabarito: boolean[] = []
  letras: string[] = ['A','B','C','D']
  resposta: string = "";

  constructor(public verAoVivoService: VerAoVivoService ){}


  ngOnInit(): void {
    this.verAoVivoService.getDadosCompletos()

    const idTopico = this.verAoVivoService.getIdTopico()
    this.verAoVivoService.controll_topico = idTopico
    this.exercicio = this.verAoVivoService.dados_completos.Topicos[idTopico].Exercicios[0]
      console.log('teste', this.exercicio.aberta)
      console.log(this.exercicio)
      this.carregarGabarito()
  }


  carregarGabarito(){
    let i = 0
    this.exercicio.Alternativas.map((alternativa: any) => {
      this.gabarito.push(alternativa.correta)
      if (alternativa.correta){
        this.selecionado[i] = true

      }
      i += 1
    })
  }

  selecionar(i: number) {
      const valorDoSelecionado = this.selecionado[i];
      for (let j = 0; j < this.selecionado.length; j++){
        this.selecionado[j] = false
      }
      this.selecionado[i] = !valorDoSelecionado
  }
}
