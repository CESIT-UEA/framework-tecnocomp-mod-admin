import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VerAoVivoService {
  public currentVideoIndex: number = 0;
  private storageKey = 'dados_completos_do_modulo';
  public dados_completos: any = [];
  notaTotal: number = 0;
  perfilUser = false;
  controll_topico: number = 0
  player: any;

  constructor() {}

  abreMenuUser() {
    this.perfilUser = true;
    console.log('Abrindo menu');
  }

  fechaMenuUser() {
    this.perfilUser = false;
    console.log('Fechou menu User');
  }

  getDadosCompletos(): void {
    this.dados_completos = localStorage.getItem(this.storageKey);
    if (this.dados_completos) {
      this.dados_completos = JSON.parse(this.dados_completos);
      this.notaTotal = this.dados_completos?.userModulo?.nota;

      console.log('Service data 3: ', this.dados_completos);
    }
  }

  setDadosCompletos(dados: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(dados));

    this.getDadosCompletos();
  }

  removeDadosCompletos(): void {
    localStorage.removeItem(this.storageKey);
  }


  loadYouTubeAPI(): void {
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);

      (window as any).onYouTubeIframeAPIReady = () => {
        this.recreatePlayer();
      };
    }
  }

  recreatePlayer(): void {
    if (this.player) {
      console.log('Caiu aqui');
      this.player.destroy(); // Destroi o player existente
    }

    const videoId = this.extractVideoId(
      this.dados_completos.Topicos?.[this.controll_topico]
        ?.VideoUrls[this.currentVideoIndex].url
    );

    this.player = new (window as any).YT.Player('player', {
      height: '100%',
      width: '100%',
      videoId: videoId,
      playerVars: {
        rel: 0,
        enablejsapi: 1,
      },
      events: {
        onReady: this.onPlayerReady.bind(this),
        onStateChange: this.onPlayerStateChange.bind(this),
      },
    });
    console.log(this.player);
  }

  extractVideoId(url: string): string {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/)?([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : '';
  }

  onPlayerReady(event: any): void {
    console.log('Player está pronto!');
  }

  onPlayerStateChange(event: any): void {
    console.log('Estado do player:', event.data);
    if (event.data == 0) {
      if (
        this.dados_completos.topicos?.[this.controll_topico]
          ?.VideoUrls[this.currentVideoIndex].UsuarioVideos[0].completo == false
      ) {
        // this.finalizarVideo(
        //   this.dados_completos.user.ltiUserId,
        //   this.dados_completos.topicos?.[this.moduloService.controll_topico]
        //     ?.VideoUrls[this.currentVideoIndex].id,
        //   this.dados_completos.user.ltik
        // ).subscribe((response) => {
        //   console.log('Vídeo finalizado:', response);
        //   this.removeDadosCompletos();
        //   this.setDadosCompletos(response);
        // });
      }
      /*       setTimeout(() => {
        this.proximo();
      }, 3000); */
    }
  }


  proximo(): void {
    console.log(this.currentVideoIndex);
    if (
      this.currentVideoIndex <
      this.dados_completos.topicos?.[this.controll_topico]
        ?.VideoUrls.length
    ) {
      console.log('Entrei');
      this.currentVideoIndex++;
      this.recreatePlayer();
    }
    // this.salvarProgressoVideos().subscribe((response) => {
    //   console.log('Progresso salvo:', response);
    //   this.removeDadosCompletos();
    //   this.setDadosCompletos(response);
    // });
  }

  voltar(): void {
    if (this.currentVideoIndex - 1 >= 0) {
      console.log(this.currentVideoIndex);
      this.currentVideoIndex = this.currentVideoIndex - 1;
      this.recreatePlayer();
    }

    // this.salvarProgressoVideos().subscribe((response) => {
    //   console.log('Progresso salvo:', response);
    //   this.removeDadosCompletos();
    //   this.setDadosCompletos(response);
    // });
  }


}
