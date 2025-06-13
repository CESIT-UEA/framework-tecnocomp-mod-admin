import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Membro } from 'src/interfaces/modulo/Membro';

@Component({
  selector: 'app-dialog-criar-membro',
  templateUrl: './dialog-criar-membro.component.html',
  styleUrls: ['./dialog-criar-membro.component.css']
})
export class DialogCriarMembroComponent {
  nome: string = '';
  cargo: string = '';
  foto_url: string = '';
  isEditando: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogCriarMembroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { membro?: Membro; equipeId?: number }
  ) {}

  ngOnInit(): void {
    if (this.data.membro) {
      this.nome = this.data.membro.nome;
      this.cargo = this.data.membro.cargo;
      this.foto_url = this.data.membro.foto_url || '';
      this.isEditando = true;
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    if (this.nome.trim() && this.cargo.trim()) {
      const membro: Partial<Membro> = {
        nome: this.nome.trim(),
        cargo: this.cargo.trim(),
        foto_url: this.foto_url?.trim(),
        equipe_id: this.data.equipeId ?? this.data.membro?.equipe_id,
        id: this.data.membro?.id,
      };
      this.dialogRef.close(membro);
    }
  }
}
