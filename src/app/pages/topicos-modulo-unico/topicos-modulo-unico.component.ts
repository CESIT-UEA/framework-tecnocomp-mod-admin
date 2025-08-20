import { ApiAdmService } from 'src/app/services/api-adm.service';
import { Component, OnInit } from '@angular/core';
import { Modulo } from 'src/interfaces/modulo/Modulo';
import { Topico } from 'src/interfaces/topico/Topico';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topicos-modulo-unico',
  templateUrl: './topicos-modulo-unico.component.html',
  styleUrls: ['./topicos-modulo-unico.component.css']
})
export class TopicosModuloUnicoComponent implements OnInit {
  topicos: Topico[] = [];
  idModulo!: number;
  currentPage: number = 1;
  quantidade_pages = 1;
  totalModulos: number = 0; 

  constructor(
    private apiService: ApiAdmService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id_modulo');
    if (id) {
      this.carregarTopicos(+id, this.currentPage);
      this.idModulo = +id
    }
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
        this.quantidade_pages = response.infoTopicosPorModulos.totalPaginas;
        this.totalModulos = response.infoTopicosPorModulos.totalRegistros;
      },
      (error) => console.error('Erro ao carregar tópicos:', error)
    );
  }

  nextPage(){
    if (this.currentPage < this.quantidade_pages){
      this.currentPage += 1
      this.carregarTopicos(this.idModulo, this.currentPage)
    }
  }

  previousPage(){
    if (this.currentPage > 1) {
      this.currentPage -= 1
      this.carregarTopicos(this.idModulo, this.currentPage)
    }
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
