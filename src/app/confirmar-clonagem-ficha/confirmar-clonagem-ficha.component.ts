import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-clonagem-ficha',
  templateUrl: './confirmar-clonagem-ficha.component.html',
  styleUrls: ['./confirmar-clonagem-ficha.component.css'],
})
export class ConfirmarClonagemFichaComponent {
    

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmarClonagemFichaComponent>
  ){}

   confirmar(){
    this.dialogRef.close(true)
  }

  cancelar(){
    this.dialogRef.close(false);
  }


}
