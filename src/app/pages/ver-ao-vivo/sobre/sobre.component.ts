import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.css']
})
export class SobreComponent {
    cards = [
    {
      titulo: 'Objetivo',
      descricao: [
        'Estudantes na faixa de 16 a 20 anos',
        'Professores de escolas',
      ],
      urlImagem: '',
    },
    {
      titulo: 'Público-Alvo',
      descricao: [
        'Estudantes na faixa de 16 a 20 anos',
        'Professores de escolas',
      ],
      urlImagem: '',
    },
    {
      titulo: 'Objetivo',
      descricao: [
        'Estudantes na faixa de 16 a 20 anos',
        'Professores de escolas',
      ],
      urlImagem: '',
    },
  ];

  /**
   * Vetor de Objetos os quais guarda as informações das equipes e de seus membros
   */
  cardEquipes = [
    {
      equipe: 'Liderança e Gestão',
      membros: [
        {
          cargo: 'Coordenador Geral',
          nome: 'João da Mata',
          image: '../../../../assets/equipe/prof-joao.jpeg',
        },
      ],
    },
    {
      equipe: 'Design e Experiência',
      membros: [
        {
          cargo: 'Designer Gráfico',
          nome: 'Adriene Chaves',
          image: '../../../../assets/equipe/adriene.jpeg',
        },
        {
          cargo: 'Designer UI/UX',
          nome: 'Lívia Monteiro',
          image: '../../../../assets/equipe/livia.jpeg',
        },
        {
          cargo: 'Designer Instrucional',
          nome: 'Jorge Coutinho',
          image: '../../../../assets/equipe/mikael.jpeg',
        },
      ],
    },
    {
      equipe: 'Produção de Conteúdo e Ensino',
      membros: [
        {
          cargo: 'Instrutor(a)',
          nome: 'Yasmim Moraes',
          image: '../../../../assets/equipe/yasmin.jpeg',
        },
        {
          cargo: 'Videomaker',
          nome: 'Jorge Coutinho',
          image: '../../../../assets/equipe/mikael.jpeg',
        },
      ],
    },
    {
      equipe: 'Desenvolvimento e Tecnologia',
      membros: [
        {
          cargo: 'Desenvolvedor Frontend (1)',
          nome: 'Kauê Olímpio',
          image: '../../../../assets/equipe/kaue.png',
        },
        {
          cargo: 'Desenvolvedor Frontend (2)',
          nome: 'Andriw Santos',
          image: '../../../../assets/equipe/andriw.jpeg',
        },
        {
          cargo: 'Desenvolvedor Full Stack',
          nome: 'Henrique Galvim',
          image: '../../../../assets/equipe/henrique.jpeg',
        },
      ],
    },
    {
      equipe: 'Qualidade e Suporte',
      membros: [
        {
          cargo: 'Analista de testes',
          nome: 'Jhonathan Maia',
          image: '../../../../assets/equipe/jonatan.jpeg',
        },
      ],
    },
    {
      equipe: 'Comunicação e Marketing',
      membros: [
        {
          cargo: 'Social Media',
          nome: 'Adriene Chaves',
          image: '../../../../assets/equipe/adriene.jpeg',
        },
      ],
    },
  ];
  /**
   * variável que controla a posição da equipe atual
   */
  currentVideoIndex: number = 0;

  /**
   * @ignore
   */
  teste = this.cardEquipes[this.currentVideoIndex];

  /**
   * @method
   * Método que retorna o número de membros da equipe da posição atual
   */
  elementMembros() {
    return this.cardEquipes[this.currentVideoIndex].membros.length;
  }

  /**
   * @method
   * método que controla o avanço para a próxima equipe
   */
  nextVideo() {
    if (this.currentVideoIndex + 1 == this.cardEquipes.length) {
      this.currentVideoIndex = this.cardEquipes.length - 1;

      return;
    } else {
      this.currentVideoIndex =
        (this.currentVideoIndex + 1) % this.cardEquipes.length;
    }
  }
  /**
   * @method
   * Método que controla o retorno para a equipe anterior
   */
  prevVideo() {
    if (this.currentVideoIndex == 0) {
      console.log('Oi');
    } else {
      this.currentVideoIndex =
        (this.currentVideoIndex - 1 + this.cardEquipes.length) %
        this.cardEquipes.length;
    }
  }

  /**
   * @method
   * @param index
   * Método que faz a variável que controla posição, receber um índice
   */
  selectVideo(index: number) {
    this.currentVideoIndex = index;
  }
}
