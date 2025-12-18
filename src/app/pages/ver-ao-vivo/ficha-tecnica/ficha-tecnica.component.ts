import { Component } from '@angular/core';
import { VerAoVivoService } from 'src/app/services/ver-ao-vivo.service';

@Component({
  selector: 'app-ficha-tecnica',
  templateUrl: './ficha-tecnica.component.html',
  styleUrls: ['./ficha-tecnica.component.css']
})
export class FichaTecnicaComponent {
    constructor(public verAoVivo: VerAoVivoService) {}
}
