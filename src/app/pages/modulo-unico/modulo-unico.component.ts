import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { Modulo } from 'src/interfaces/topico/Modulo';
import { Topico } from 'src/interfaces/topico/Topico';

@Component({
  selector: 'app-modulo-unico',
  templateUrl: './modulo-unico.component.html',
  styleUrls: ['./modulo-unico.component.css']
})
export class ModuloUnicoComponent implements OnInit {
  modulo!: Modulo | null;
  topicos: Topico[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiAdmService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarModulo(+id);
      this.carregarTopicos(+id);
    }
  }

  carregarModulo(id: number): void {
    this.apiService.obterModuloPorId(id).subscribe(
      (response) => (this.modulo = response),
      (error) => {
        console.error('Erro ao carregar módulo:', error);
        this.router.navigate(['/modulos']);
      }
    );
  }

  carregarTopicos(moduloId: number): void {
    this.apiService.obterTopicoCompleto(moduloId).subscribe(
      (response) => {
        console.log(response)
        this.topicos = response.map((topico) => ({
          ...topico,
          videoUrls: [],
          saibaMais: [],
          referencias: [],
          exercicios: [],
        }));

        // Para cada tópico, buscar os dados completos
        this.topicos.forEach((topico, index) => {
          if (topico.id != null) {
            this.apiService.obterTopicoCompleto(topico.id).subscribe(
              (topicoCompleto) => {
                this.topicos[index] = { ...this.topicos[index], ...topicoCompleto };
              },
              (error) => console.error('Erro ao carregar dados completos do tópico:', error)
            );
          }
        });
      },
      (error) => console.error('Erro ao carregar tópicos:', error)
    );
  }


  cadastrarTopico(): void {
    this.router.navigate(['/modulos', this.modulo?.id, 'cadastrar-topico']);
  }

  alterarPublicacao(): void {
    if (this.modulo) {
      const novoStatus = !this.modulo.publicado;
      if (this.modulo.id != null) {
        this.apiService.alterarStatusPublicacao(this.modulo.id, novoStatus).subscribe(
          (moduloAtualizado) => {
            this.modulo = moduloAtualizado; // Atualiza o estado do módulo
            alert(
              `O módulo foi ${novoStatus ? 'publicado' : 'despublicado'} com sucesso!`
            );
          },
          (error) => {
            console.error('Erro ao alterar status de publicação:', error);
            alert('Erro ao alterar status de publicação!');
          }
        );
      }
    }
  }
}
