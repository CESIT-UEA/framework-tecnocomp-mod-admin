import { ApiAdmService } from 'src/app/services/api-adm.service';
import { Component, OnInit } from '@angular/core';
import { Modulo } from 'src/interfaces/modulo/Modulo';
import { Topico } from 'src/interfaces/topico/Topico';
import { ActivatedRoute } from '@angular/router';
import { PaginationService, PaginationState } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-topicos-modulo-unico',
  templateUrl: './topicos-modulo-unico.component.html',
  styleUrls: ['./topicos-modulo-unico.component.css']
})
export class TopicosModuloUnicoComponent implements OnInit {
  topicos: Topico[] = [];
  idModulo!: number;
  pagination: PaginationState;

  constructor(
    private apiService: ApiAdmService,
    private route: ActivatedRoute,
    private paginationService: PaginationService
  ){
    this.pagination = this.paginationService.createPaginationState();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id_modulo');
    if (id) {
      this.carregarTopicos(+id, this.pagination.currentPage);
      this.idModulo = +id;
    }
  }

  // Handler para mudanças de página
  onPageChange(page: number): void {
    this.carregarTopicos(this.idModulo, page);
  }

  carregarTopicos(moduloId: number, page: number): void {
    this.apiService.obterTopicoCompleto(moduloId, page).subscribe(
      (response) => {
        console.log(response);
        this.topicos = response.topico.map((topico) => ({
          ...topico,
          videoUrls: [],
          saibaMais: [],
          referencias: [],
          exercicios: [],
        }));

        // Para cada tópico, buscar os dados completos
        this.topicos.forEach((topico, index) => {
          if (topico.id != null) {
            this.apiService.obterTopicoCompleto(topico.id, page).subscribe(
              (topicoCompleto) => {
                this.topicos[index] = {
                  ...this.topicos[index],
                  ...topicoCompleto,
                };
              },
              (error) =>
                console.error(
                  'Erro ao carregar dados completos do tópico:',
                  error
                )
            );
          }
        });
        
        // Atualizar o estado de paginação
        this.paginationService.updatePaginationState(
          this.pagination,
          response.infoTopicosPorModulos.totalPaginas,
          response.infoTopicosPorModulos.totalRegistros
        );
      },
      (error) => console.error('Erro ao carregar tópicos:', error)
    );
  }

  excluirTopico({
    idAdm,
    senhaAdm,
    idExcluir,
  }: {
    idAdm: number;
    senhaAdm: string;
    idExcluir: number;
  }) {
    
    this.apiService.excluirTopico(idExcluir, idAdm, senhaAdm).subscribe(
      () => {
        alert('Tópico excluído com sucesso!');
        this.topicos = this.topicos.filter((topico) => topico.id !== idExcluir);
      },
      (error) => {
        console.log(error);
        if (error.status === 401) {
          alert('Senha de administrador incorreta.');
        } else if (error.status === 403) {
          alert('Você não tem permissão para realizar essa ação.');
        } else if (error.status === 404) {
          alert('Tópico não encontrado.');
        } else {
          alert('Erro ao excluir tópico.');
        }
      }
    );
  }
}
