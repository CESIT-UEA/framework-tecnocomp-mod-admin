import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { VerAoVivoService } from 'src/app/services/ver-ao-vivo.service';

@Component({
  selector: 'app-video-topico',
  templateUrl: './video-topico.component.html',
  styleUrls: ['./video-topico.component.css']
})
export class VideoTopicoComponent implements OnInit, AfterViewInit, OnDestroy{
  @Input({ required: true }) videos!: any[];
  isLoading = false;

  constructor(
    public ltiService: VerAoVivoService,
  ) {}

  ngOnInit(): void {
    console.log(this.videos)
    // if (
    //   this.ltiService.dados_completos.userTopico[this.ltiService.controll_topico]
    //     .UsuarioTopicos[0].indice_video != null
    // ) {
    //   this.ltiService.currentVideoIndex =
    //     this.ltiService.dados_completos.userTopico[
    //       this.ltiService.controll_topico
    //     ].UsuarioTopicos[0].indice_video;
    // }
    this.ltiService.loadYouTubeAPI();
  }

  ngAfterViewInit(): void {
    this.ltiService.recreatePlayer();
  }

  ngOnDestroy(): void {
    if (this.ltiService.player) {
      this.ltiService.player.destroy();
      this.ltiService.player = null;
    }
  }

  // Retorna os vídeos visíveis na página atual
  get arrayVisivel() {
    return this.videos;
  }

  selectVideo(index: number): void {
    this.startLoading();
    this.ltiService.currentVideoIndex = index;
    this.ltiService.recreatePlayer();
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
