import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AlunoGerenciamentoService } from 'src/app/services/aluno-gerenciamento.service';
import { AlunoModulo } from 'src/interfaces/modulo/aluno-modulo.interface';
import { DialogConfirmarRemocaoComponent } from '../dialog-confirmar-remocao/dialog-confirmar-remocao.component';
import { DialogEditarAlunoComponent } from '../dialog-editar-aluno/dialog-editar-aluno.component';

@Component({
  selector: 'app-gerenciar-alunos',
  templateUrl: './gerenciar-alunos.component.html',
  styleUrls: ['./gerenciar-alunos.component.css'],
})
export class GerenciarAlunosComponent {
  moduloId!: number;
  alunos: AlunoModulo[] = [];

  filtros: {
    nome?: string;
    email?: string;
    ativo?: boolean;
    progressoMin?: number;
    notaMin?: number;
  } = {};

  constructor(
    private route: ActivatedRoute,
    private alunoService: AlunoGerenciamentoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.moduloId = +this.route.snapshot.paramMap.get('id')!;
    this.carregarAlunos();
  }

  carregarAlunos(): void {
    this.alunoService
      .getAlunosPorModulo(this.moduloId, this.filtros)
      .subscribe({
        next: (res) => (this.alunos = res),
        error: (err) => console.error('Erro ao carregar alunos:', err),
      });
  }

  confirmarRemocao(aluno: AlunoModulo): void {
    const dialogRef = this.dialog.open(DialogConfirmarRemocaoComponent, {
      width: '350px',
      data: {
        titulo: 'Remover Aluno',
        mensagem: `Deseja remover o aluno "${aluno.Aluno?.nome}" deste módulo?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.alunoService.deletarAluno(aluno.id_aluno).subscribe(() => {
          this.carregarAlunos();
        });
      }
    });
  }

  editarAluno(aluno: AlunoModulo): void {
    const dialogRef = this.dialog.open(DialogEditarAlunoComponent, {
      width: '400px',
      data: aluno,
    });

    dialogRef
      .afterClosed()
      .subscribe((dadosAtualizados: Partial<AlunoModulo>) => {
        if (dadosAtualizados) {
          this.alunoService
            .atualizarAluno(aluno.id, dadosAtualizados)
            .subscribe(() => {
              this.carregarAlunos();
            });
        }
      });
  }

  aplicarFiltros(): void {
    this.carregarAlunos();
  }

  limparFiltros(): void {
    this.filtros = {};
    this.carregarAlunos();
  }
}
