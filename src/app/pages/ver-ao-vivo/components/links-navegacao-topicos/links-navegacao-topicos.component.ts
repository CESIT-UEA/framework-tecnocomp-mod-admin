import { Component, OnInit } from '@angular/core';
import { VerAoVivoService } from 'src/app/services/ver-ao-vivo.service';

@Component({
  selector: 'app-links-navegacao-topicos',
  templateUrl: './links-navegacao-topicos.component.html',
  styleUrls: ['./links-navegacao-topicos.component.css']
})
export class LinksNavegacaoTopicosComponent implements OnInit {


  constructor(public verAoVivoService: VerAoVivoService){}

  ngOnInit(): void {
      this.verAoVivoService.getDadosCompletos()
  }

  verificaProximo() {
    let topicos: any[] = this.verAoVivoService.dados_completos.Topicos;
    if (
      this.verAoVivoService.controll_topico >= 0 &&
      this.verAoVivoService.controll_topico < topicos?.length - 1
    ) {
      return true;
    }

    return false;
  }
  verificaVoltar() {
    let topicos: any[] = this.verAoVivoService.dados_completos.Topicos;

    if (
      this.verAoVivoService.controll_topico > 0 &&
      this.verAoVivoService.controll_topico <= topicos?.length
    ) {
      return true;
    }

    return false;
  }

  proximo(): void {
    this.verAoVivoService.currentVideoIndex = 0;
    if (
      this.verAoVivoService.controll_topico <
      this.verAoVivoService.dados_completos.Topicos.length - 1
    ) {
      if (
        this.verAoVivoService.dados_completos.userTopico[
          this.verAoVivoService.controll_topico
        ]?.UsuarioTopicos[0].encerrado
      ) {
        this.verAoVivoService.controll_topico += 1;
      } else {
        // this.ltiService.mensagem('Você precisa responder à atividade antes!');
      }
    }

    if (
      this.verAoVivoService.dados_completos.userTopico[
        this.verAoVivoService.controll_topico
      ].UsuarioTopicos[0].indice_video != null
    ) {
      this.verAoVivoService.currentVideoIndex =
        this.verAoVivoService.dados_completos.userTopico[
          this.verAoVivoService.controll_topico
        ].UsuarioTopicos[0].indice_video;
      console.log('Video retornado salvo já');
    }

    // this.ltiService.recreatePlayer();
  }

  voltarCss() {
    if (this.verAoVivoService.controll_topico == 0) {
      return 'display:none';
    }

    return;
  }
  voltar(): void {
    if (this.verAoVivoService.controll_topico > 0) {
      this.verAoVivoService.controll_topico -= 1;
      this.verAoVivoService.currentVideoIndex = 0;
    }

    if (
      this.verAoVivoService.dados_completos.userTopico[
        this.verAoVivoService.controll_topico
      ].UsuarioTopicos[0].indice_video != null
    ) {
      this.verAoVivoService.currentVideoIndex =
        this.verAoVivoService.dados_completos.userTopico[
          this.verAoVivoService.controll_topico
        ].UsuarioTopicos[0].indice_video;
      console.log('Video retornado salvo já');
    }
    // this.ltiService.recreatePlayer();
  }
}
