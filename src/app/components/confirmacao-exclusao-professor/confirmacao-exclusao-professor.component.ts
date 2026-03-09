import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao-exclusao-professor',
  templateUrl: './confirmacao-exclusao-professor.component.html',
  styleUrls: ['./confirmacao-exclusao-professor.component.css']
})
export class ConfirmacaoExclusaoProfessorComponent {
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: { titulo: string, componente: string },
      public dialogRef: MatDialogRef<ConfirmacaoExclusaoProfessorComponent>
    ) {}
  
    onConfirmar(): void {
      this.dialogRef.close(true);
    }
  
    onCancelar(): void {
      this.dialogRef.close();
    }
}
