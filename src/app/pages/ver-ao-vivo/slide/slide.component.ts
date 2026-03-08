import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VerAoVivoService } from 'src/app/services/ver-ao-vivo.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent {
    caminhoSlide!: any;
      teste:any;
      
    constructor(public verAoVivoService: VerAoVivoService, private sanitizer: DomSanitizer){}
    
    
    ngOnInit(): void {
      this.verAoVivoService.getDadosCompletos()
      const idTopico = this.verAoVivoService.getIdTopico()
      this.verAoVivoService.controll_topico = idTopico
      this.caminhoSlide = this.verAoVivoService.dados_completos.Topicos[idTopico].textoApoio
      console.log(this.caminhoSlide)
      this.teste = `<div style="
          display:flex;
          flex-direction:collumn;
          justify-content:center;
          position: relative;
          width: 100%;

          height: 100%">
          <iframe loading="lazy" style="width: 100%; height: 100%; border: none; padding: 0;margin: 0;"
            src=`+ this.caminhoSlide + ` allow="fullscreen">
          </iframe>
        </div>
        `;
    this.teste = this.sanitizer.bypassSecurityTrustHtml(this.teste)
  }

 
}
