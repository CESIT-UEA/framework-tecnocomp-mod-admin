import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerAoVivoService } from 'src/app/services/ver-ao-vivo.service';
import { Membro } from 'src/interfaces/modulo/Membro';

@Component({
  selector: 'app-informacoes-gerais-modulo',
  templateUrl: './informacoes-gerais-modulo.component.html',
  styleUrls: ['./informacoes-gerais-modulo.component.css'],
})
export class InformacoesGeraisModuloComponent {
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    public verAoVivo: VerAoVivoService
  ) {}
  ngOnInit(): void {
  }
  estrelas = new Array(5).fill(0);

  calcularMedia() {}

  getInstrutores(): Membro[] {
    const instrutores =
      this.verAoVivo.dados_completos?.FichaTecnica?.Equipes.flatMap(
        (equipe: any) => equipe.Membros as Membro[]
      )
        .filter((membro: any) => membro.cargo === 'Instrutor(a)');

    return instrutores;
  }
}
