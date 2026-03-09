import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-confirmacao-exclusao',
  templateUrl: './confirmacao-exclusao.component.html',
  styleUrls: ['./confirmacao-exclusao.component.css']
})
export class ConfirmacaoExclusaoComponent {
  senhaAdm = new FormControl('', Validators.required);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { titulo: string },
    public dialogRef: MatDialogRef<ConfirmacaoExclusaoComponent>
  ) {}

  onConfirmar(): void {
    if (this.senhaAdm.invalid) {
      this.senhaAdm.markAsTouched();
      return;
  }

  this.dialogRef.close(this.senhaAdm.value);
  }

  onCancelar(): void {
    this.dialogRef.close();
  }
}
