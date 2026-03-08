import { Component } from '@angular/core';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { VerAoVivoService } from 'src/app/services/ver-ao-vivo.service';

@Component({
  selector: 'app-links-navegacao',
  templateUrl: './links-navegacao.component.html',
  styleUrls: ['./links-navegacao.component.css']
})
export class LinksNavegacaoComponent {
  constructor(
      public ltiService: VerAoVivoService
    ){}


  proximo(): void {
    this.ltiService.currentVideoIndex = 0;
    if (
      this.ltiService.controll_topico <
      this.ltiService.dados_completos.Topicos.length - 1
    ) {
        this.ltiService.controll_topico += 1;
        this.ltiService.salvarIdTopico()
      } 
    
    
    this.ltiService.recreatePlayer();
  }

  
  voltar(): void {
    if (this.ltiService.controll_topico > 0) {
      this.ltiService.controll_topico -= 1;
      this.ltiService.currentVideoIndex = 0;
      this.ltiService.salvarIdTopico()
    }

    
    this.ltiService.recreatePlayer();
  }

  verificaProximo() {
    let topicos: any[] = this.ltiService.dados_completos.Topicos;

    if (
      this.ltiService.controll_topico >= 0 &&
      this.ltiService.controll_topico < topicos.length - 1
    ) {
      return true;
    }

    return false;
  }

}
