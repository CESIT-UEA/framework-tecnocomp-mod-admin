import { Component } from '@angular/core';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { Plataforma } from 'src/interfaces/Plataforma';

@Component({
  selector: 'app-plataforma-page',
  templateUrl: './plataforma-page.component.html',
  styleUrls: ['./plataforma-page.component.css']
})
export class PlataformaPageComponent {
  plataformas: Plataforma[] = [];

  constructor(private apiService: ApiAdmService) {}

  ngOnInit(): void {
    this.apiService.listarPlataformas().subscribe(
      (response) => {
        this.plataformas = response;
      },
      (error) => {
        console.error('Erro ao carregar plataformas:', error);
      }
    );
  }

  excluirPlataforma({ idAdm, senhaAdm, idExcluir }: { idAdm: number; senhaAdm: string; idExcluir: number }) {
    this.apiService.excluirPlataforma(idAdm, senhaAdm, idExcluir).subscribe(
      () => {
        alert('Plataforma excluída com sucesso!');
        this.plataformas = this.plataformas.filter((plataforma) => plataforma.id !== idExcluir);
      },
      (error) => {
        console.error('Erro ao excluir plataforma:', error);
        if (error.status === 401) {
          alert('Senha de administrador incorreta.');
        } else if (error.status === 403) {
          alert('Você não tem permissão para realizar essa ação.');
        } else if (error.status === 404) {
          alert('Plataforma não encontrada.');
        } else {
          alert('Erro ao excluir plataforma.');
        }
      }
    );
  }
}
