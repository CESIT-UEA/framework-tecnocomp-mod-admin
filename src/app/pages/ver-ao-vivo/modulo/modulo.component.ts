import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { VerAoVivoService } from 'src/app/services/ver-ao-vivo.service';
import { Modulo } from 'src/interfaces/modulo/Modulo';
import { Topico } from 'src/interfaces/topico/Topico';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css'],
})
export class ModuloComponent implements OnInit {
  modulo!: Modulo | null;
  topicos: Topico[] = [];
  idModulo!: number;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiAdmService,
    private verAoVivo: VerAoVivoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id_modulo');
    if (id) {
      console.log('Teste');
      this.carregarModulo(+id);
      // this.carregarTopicos(+id);
    }
    if (this.modulo?.id != null) {
      this.idModulo = this.modulo.id;
    }
  }

  carregarModulo(id: number): void {
    this.apiService.obterModuloPorId(id).subscribe(
      (response) => {
        this.modulo = response;
        console.log(response);
        this.verAoVivo.removeDadosCompletos();
        this.verAoVivo.setDadosCompletos(response);
      },
      (error) => {
        console.error('Erro ao carregar módulo:', error);
        this.router.navigate(['/modulos']);
      }
    );
  }

  // carregarTopicos(moduloId: number): void {
  //   this.apiService.obterTopicoCompleto(moduloId).subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.topicos = response.map((topico) => ({
  //         ...topico,
  //         videoUrls: [],
  //         saibaMais: [],
  //         referencias: [],
  //         exercicios: [],
  //       }));

  //       // Para cada tópico, buscar os dados completos
  //       this.topicos.forEach((topico, index) => {
  //         if (topico.id != null) {
  //           this.apiService.obterTopicoCompleto(topico.id,).subscribe(
  //             (topicoCompleto) => {
  //               this.topicos[index] = {
  //                 ...this.topicos[index],
  //                 ...topicoCompleto,
  //               };
  //             },
  //             (error) =>
  //               console.error(
  //                 'Erro ao carregar dados completos do tópico:',
  //                 error
  //               )
  //           );
  //         }
  //       });
  //     },
  //     (error) => console.error('Erro ao carregar tópicos:', error)
  //   );
  // }
}
