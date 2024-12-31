import { Component } from '@angular/core';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { Modulo } from 'src/interfaces/modulo/Modulo';

@Component({
  selector: 'app-modulos-page',
  templateUrl: './modulos-page.component.html',
  styleUrls: ['./modulos-page.component.css']
})
export class ModulosPageComponent {
  modulos: Modulo[] = [];

  constructor(private apiService: ApiAdmService) {}

  ngOnInit(): void {
    this.apiService.listarModulos().subscribe(
      (response) => {
        this.modulos = response;
        console.log(response);
      },
      (error) => {
        console.error('Erro ao carregar módulos:', error);
      }
    );
  }

  excluirModulo({ idAdm, senhaAdm, idExcluir }: { idAdm: number; senhaAdm: string; idExcluir: number }) {
    this.apiService.excluirModulo(idExcluir,idAdm, senhaAdm ).subscribe(
      () => {
        alert('Modulo excluído com sucesso!');
        this.modulos = this.modulos.filter((modulo) => modulo.id !== idExcluir);
      },
      (error) => {
        console.log(error)
        if (error.status === 401) {
          alert('Senha de administrador incorreta.');
        } else if (error.status === 403) {
          alert('Você não tem permissão para realizar essa ação.');
        } else if (error.status === 404) {
          alert('Modulo não encontrado.');
        } else {
          alert('Erro ao excluir modulo.');
        }
      }
    );
  }
}
