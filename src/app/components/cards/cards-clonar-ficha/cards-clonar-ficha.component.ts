import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmarClonagemFichaComponent } from 'src/app/confirmar-clonagem-ficha/confirmar-clonagem-ficha.component';
import { ApiAdmService } from 'src/app/services/api-adm.service';
import { FichaTecnicaService } from 'src/app/services/ficha-tecnica.service';
import { Modulo } from 'src/interfaces/modulo/Modulo';

@Component({
  selector: 'app-cards-clonar-ficha',
  templateUrl: './cards-clonar-ficha.component.html',
  styleUrls: ['./cards-clonar-ficha.component.css'],
})
export class CardsClonarFichaComponent implements OnInit {
  @Input() modulo!: Modulo;
  id_modulo_que_vai_clonar!: number;
  id_modulo_que_esta_sendo_clonado!: number;

  constructor(
      private dialog: MatDialog,
      private route: ActivatedRoute,
      private fichaService: FichaTecnicaService,
      private admService: ApiAdmService
    )
  {

  }


  ngOnInit(): void {
      this.id_modulo_que_esta_sendo_clonado = Number(this.route.snapshot.paramMap.get('id'));
  }

  abrirConfirmacao(){
    const dialogRef = this.dialog.open(ConfirmarClonagemFichaComponent, {
          width: '484px',
          height: '200px',
          panelClass: 'cardClonagemFicha',
          data: {
            titulo: "Clonar para Módulo",
            mensagem: `${this.modulo.nome_modulo}`,
            
          }
          
      });

      dialogRef.afterClosed().subscribe((valor)=> {
        if (valor && this.modulo.id) {
          this.id_modulo_que_vai_clonar = this.modulo.id;
          this.fichaService.clonarFichaTecnica(
              this.id_modulo_que_vai_clonar, 
              this.id_modulo_que_esta_sendo_clonado
          )
          .subscribe({
            next: (resultado) => {
              console.log(resultado)
              this.admService.message('Ficha Técnica clonada com sucesso!')
            },
            error: (err) => {
              console.error(`Erro ao clonar ficha técnica`, err)
              this.admService.message('Erro ao clonar ficha técnica!')
              
            }
          })
        }

        
      })
  }
}
