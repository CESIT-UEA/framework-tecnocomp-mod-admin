import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { VerAoVivoService } from 'src/app/services/ver-ao-vivo.service';

@Component({
  selector: 'app-slide-unidade',
  templateUrl: './slide-unidade.component.html',
  styleUrls: ['./slide-unidade.component.css']
})
export class SlideUnidadeComponent implements OnInit, AfterViewInit, OnDestroy{
  @Input({ required: true }) videos!: any[];
  isLoading = false;

  constructor(public verAoVivoService: VerAoVivoService){}
  
  ngOnInit(): void {
    this.verAoVivoService.getDadosCompletos()

    if (
      this.verAoVivoService.dados_completos.userTopico[this.verAoVivoService.controll_topico]
        .UsuarioTopicos[0].indice_video != null
    ) {
      this.verAoVivoService.currentVideoIndex =
        this.verAoVivoService.dados_completos.userTopico[
          this.verAoVivoService.controll_topico
        ].UsuarioTopicos[0].indice_video;
    }

    this.verAoVivoService.recreatePlayer()
  }

  ngAfterViewInit(): void {
    this.verAoVivoService.recreatePlayer();
  }

  ngOnDestroy(): void {
    if (this.verAoVivoService.player) {
      this.verAoVivoService.player.destroy();
      this.verAoVivoService.player = null;
    }
  }

  // Retorna os vídeos visíveis na página atual
  get arrayVisivel() {
    return this.videos;
  }

  selectVideo(index: number): void {
    this.startLoading();
    this.verAoVivoService.currentVideoIndex = index;
    this.verAoVivoService.recreatePlayer();
    this.stopLoading();
  }

  startLoading(): void {
    this.isLoading = true;
  }

  stopLoading(): void {
    this.isLoading = false;
  }

  getVerificaVideosAssistidos(): number {
    return this.videos.filter((video) => video.UsuarioVideos[0].completo).length;
  }

}
