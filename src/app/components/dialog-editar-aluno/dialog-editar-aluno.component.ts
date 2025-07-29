import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlunoModulo } from 'src/interfaces/modulo/aluno-modulo.interface';

@Component({
  selector: 'app-dialog-editar-aluno',
  templateUrl: './dialog-editar-aluno.component.html',
  styleUrls: ['./dialog-editar-aluno.component.css']
})
export class DialogEditarAlunoComponent {
  nota: number;
  progresso: number;
  avaliacao: number | null;
  comentario: string;
  ativo: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogEditarAlunoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlunoModulo
  ) {
    this.nota = data.nota;
    this.progresso = data.progresso;
    this.avaliacao = data.avaliacao ?? null;
    this.comentario = data.comentario || '';
    this.ativo = data.ativo;
  }

  salvar(): void {
    this.dialogRef.close({
      nota: this.nota,
      progresso: this.progresso,
      avaliacao: this.avaliacao,
      comentario: this.comentario,
      ativo: this.ativo,
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
