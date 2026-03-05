import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-continuar-cadastrando-topico',
  templateUrl: './continuar-cadastrando-topico.component.html',
  styleUrls: ['./continuar-cadastrando-topico.component.css']
})
export class ContinuarCadastrandoTopicoComponent {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ContinuarCadastrandoTopicoComponent>
  ){

  }

  confirmar(){
    this.dialogRef.close(true)
  }

  cancelar(){
    this.dialogRef.close(false);
  }
}
