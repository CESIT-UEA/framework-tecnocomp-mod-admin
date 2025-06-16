import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FichaTecnicaService } from 'src/app/services/ficha-tecnica.service';
import { Equipe } from 'src/interfaces/modulo/Equipe';
import { FichaTecnica } from 'src/interfaces/modulo/FichaTecnica';
import { DialogCriarEquipeComponent } from '../dialog-criar-equipe/dialog-criar-equipe.component';
import { DialogConfirmarRemocaoComponent } from '../dialog-confirmar-remocao/dialog-confirmar-remocao.component';
import { Membro } from 'src/interfaces/modulo/Membro';
import { DialogCriarMembroComponent } from '../dialog-criar-membro/dialog-criar-membro.component';

@Component({
  selector: 'app-gerenciar-ficha-tecnica',
  templateUrl: './gerenciar-ficha-tecnica.component.html',
  styleUrls: ['./gerenciar-ficha-tecnica.component.css'],
})
export class GerenciarFichaTecnicaComponent implements OnInit {
    moduloId!: number;
  fichaTecnica: FichaTecnica | null = null;
  equipes: Equipe[] = [];
  membrosPorEquipe: { [equipeId: number]: Membro[] } = {};

  constructor(
    private route: ActivatedRoute,
    private fichaService: FichaTecnicaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.moduloId = +this.route.snapshot.paramMap.get('id')!;
    this.carregarFicha();
  }

  carregarFicha(): void {
    this.fichaService.getFichaTecnicaByModulo(this.moduloId).subscribe((res) => {
      if (typeof res === 'string') {
        this.fichaTecnica = null;
        this.equipes = [];
        this.membrosPorEquipe = {};
      } else {
        this.fichaTecnica = res;
        this.carregarEquipes();
      }
    });
  }

  criarFicha(): void {
    this.fichaService.criarFichaTecnica(this.moduloId).subscribe((res) => {
      this.fichaTecnica = res;
      this.carregarEquipes();
    });
  }

  carregarEquipes(): void {
    if (!this.fichaTecnica) return;

    this.fichaService.getEquipes(this.fichaTecnica.id).subscribe((res) => {
      this.equipes = res;
      this.membrosPorEquipe = {};
    });
  }

  carregarMembros(equipeId: number): void {
    this.fichaService.getMembros(equipeId).subscribe((res) => {
      this.membrosPorEquipe[equipeId] = res;
    });
  }

  adicionarEquipe(): void {
    const dialogRef = this.dialog.open(DialogCriarEquipeComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((nome) => {
      if (nome && this.fichaTecnica) {
        this.fichaService
          .criarEquipe({
            nome,
            ficha_tecnica_id: this.fichaTecnica.id,
          })
          .subscribe(() => this.carregarEquipes());
      }
    });
  }

  deletarEquipe(equipeId: number): void {
    const dialogRef = this.dialog.open(DialogConfirmarRemocaoComponent, {
      width: '350px',
      data: {
        titulo: 'Remover Equipe',
        mensagem: 'Tem certeza que deseja remover esta equipe?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.fichaService.deletarEquipe(equipeId).subscribe(() => {
          this.carregarEquipes();
        });
      }
    });
  }

  adicionarMembro(equipeId: number): void {
    const dialogRef = this.dialog.open(DialogCriarMembroComponent, {
      width: '400px',
      data: { equipeId },
    });

    dialogRef.afterClosed().subscribe((membro) => {
      if (membro) {
        this.fichaService.criarMembro(membro).subscribe(() => {
          this.carregarMembros(equipeId);
        });
      }
    });
  }
editarMembro(membro: Membro): void {
  const dialogRef = this.dialog.open(DialogCriarMembroComponent, {
    width: '400px',
    data: { membro }
  });

  dialogRef.afterClosed().subscribe((dadosAtualizados: Partial<Membro>) => {
    if (dadosAtualizados) {
      this.fichaService.atualizarMembro(membro.id, dadosAtualizados).subscribe(() => {
        this.carregarMembros(membro.equipe_id);
      });
    }
  });
}

  removerMembro(membro: Membro): void {
    const dialogRef = this.dialog.open(DialogConfirmarRemocaoComponent, {
      width: '350px',
      data: {
        titulo: 'Remover Membro',
        mensagem: `Deseja remover o membro "${membro.nome}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.fichaService.deletarMembro(membro.id).subscribe(() => {
          this.carregarMembros(membro.equipe_id);
        });
      }
    });
  }
}
