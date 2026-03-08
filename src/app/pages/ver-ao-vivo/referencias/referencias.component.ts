import { Component } from '@angular/core';
import { VerAoVivoService } from 'src/app/services/ver-ao-vivo.service';

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.css']
})
export class ReferenciasComponent {
  referencias!: any[];

  constructor(public verAoVivoService: VerAoVivoService){}
  
  
    ngOnInit(): void {
        this.verAoVivoService.getDadosCompletos()
        this.referencias = this.verAoVivoService.dados_completos.ReferenciaModulos
        console.log(this.referencias)
    }
  
}
