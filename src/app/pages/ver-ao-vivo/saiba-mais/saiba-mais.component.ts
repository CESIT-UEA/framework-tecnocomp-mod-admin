import { Component, Input, OnInit } from '@angular/core';
import { VerAoVivoService } from 'src/app/services/ver-ao-vivo.service';

@Component({
  selector: 'app-saiba-mais',
  templateUrl: './saiba-mais.component.html',
  styleUrls: ['./saiba-mais.component.css']
})
export class SaibaMaisComponent implements OnInit {
  saibaMais!: any;
  constructor(public verAoVivoService: VerAoVivoService){}


  ngOnInit(): void {
    this.verAoVivoService.getDadosCompletos()
    const idTopico = this.verAoVivoService.getIdTopico()
    this.verAoVivoService.controll_topico = idTopico
      this.saibaMais = this.verAoVivoService.dados_completos.Topicos[idTopico].SaibaMais
      console.log(this.saibaMais)
  }


 
}
