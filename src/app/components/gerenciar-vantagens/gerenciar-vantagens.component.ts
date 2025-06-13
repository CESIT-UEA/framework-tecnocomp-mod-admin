import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { VantagemService } from 'src/app/services/vantagem.service';
import { Vantagem } from 'src/interfaces/modulo/vantagem.interface';
import { DialogCriarVantagemComponent } from '../dialog-criar-vantagem/dialog-criar-vantagem.component';
import { DialogConfirmarRemocaoComponent } from '../dialog-confirmar-remocao/dialog-confirmar-remocao.component';

@Component({
  selector: 'app-gerenciar-vantagens',
  templateUrl: './gerenciar-vantagens.component.html',
  styleUrls: ['./gerenciar-vantagens.component.css']
})
export class GerenciarVantagensComponent {
 moduloId!: number;
  vantagens: Vantagem[] = [];

  constructor(
    private route: ActivatedRoute,
    private vantagemService: VantagemService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.moduloId = +this.route.snapshot.paramMap.get('id')!;
    this.carregarVantagens();
  }

  carregarVantagens(): void {
    this.vantagemService.listar(this.moduloId).subscribe((res) => {
      this.vantagens = res;
    });
  }

  adicionarVantagem(): void {
    const dialogRef = this.dialog.open(DialogCriarVantagemComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe((descricao: string) => {
      if (descricao) {
        this.vantagemService.criar({
          descricao,
          modulo_id: this.moduloId
        }).subscribe(() => this.carregarVantagens());
      }
    });
  }

  editarVantagem(vantagem: Vantagem): void {
    const dialogRef = this.dialog.open(DialogCriarVantagemComponent, {
      width: '400px',
      data: vantagem
    });

    dialogRef.afterClosed().subscribe((descricao: string) => {
      if (descricao) {
        this.vantagemService.atualizar(vantagem.id, { descricao }).subscribe(() => {
          this.carregarVantagens();
        });
      }
    });
  }

  removerVantagem(vantagem: Vantagem): void {
    const dialogRef = this.dialog.open(DialogConfirmarRemocaoComponent, {
      width: '350px',
      data: {
        titulo: 'Remover Vantagem',
        mensagem: 'Tem certeza que deseja remover esta vantagem?'
      }
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.vantagemService.remover(vantagem.id).subscribe(() => {
          this.carregarVantagens();
        });
      }
    });
  }
}
