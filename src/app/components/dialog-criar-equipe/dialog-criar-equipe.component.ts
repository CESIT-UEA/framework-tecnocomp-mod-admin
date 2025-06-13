import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-criar-equipe',
  templateUrl: './dialog-criar-equipe.component.html',
  styleUrls: ['./dialog-criar-equipe.component.css']
})
export class DialogCriarEquipeComponent {
  nome: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogCriarEquipeComponent>
  ) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    if (this.nome.trim()) {
      this.dialogRef.close(this.nome.trim());
    }
  }
}
