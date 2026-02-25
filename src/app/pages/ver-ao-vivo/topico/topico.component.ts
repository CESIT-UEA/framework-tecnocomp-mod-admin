import { Component, OnInit } from '@angular/core';
import { VerAoVivoService } from 'src/app/services/ver-ao-vivo.service';

@Component({
  selector: 'app-topico',
  templateUrl: './topico.component.html',
  styleUrls: ['./topico.component.css']
})
export class TopicoComponent implements OnInit {
  constructor(public verAoVivoService: VerAoVivoService){}

  ngOnInit(): void {
    this.verAoVivoService.getDadosCompletos();
  }

  get topicos(): any[] {
    return this.verAoVivoService.dados_completos?.Topicos ?? [];
  }

  get topicoAtual(): any | null {
    return this.topicos[this.verAoVivoService.controll_topico] ?? null;
  }

  avancarTopico(): void {
    const proximoIndex = this.verAoVivoService.controll_topico + 1;
    if (proximoIndex < this.topicos.length) {
      this.verAoVivoService.controll_topico = proximoIndex;
    }
  }
}
