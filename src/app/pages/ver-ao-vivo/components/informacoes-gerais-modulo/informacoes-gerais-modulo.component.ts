import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerAoVivoService } from 'src/app/services/ver-ao-vivo.service';

@Component({
  selector: 'app-informacoes-gerais-modulo',
  templateUrl: './informacoes-gerais-modulo.component.html',
  styleUrls: ['./informacoes-gerais-modulo.component.css']
})
export class InformacoesGeraisModuloComponent {
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    public verAoVivo:VerAoVivoService
  ) {}
  ngOnInit(): void {

  }
  estrelas = new Array(5).fill(0);

  calcularMedia(){
    /* Colocar a lógica da média de estrelas ou fazer direto no back */
  }

}
