import { Component, OnInit } from '@angular/core';
import { VerAoVivoService } from 'src/app/services/ver-ao-vivo.service';

@Component({
  selector: 'app-ficha-tecnica',
  templateUrl: './ficha-tecnica.component.html',
  styleUrls: ['./ficha-tecnica.component.css']
})
export class FichaTecnicaComponent implements OnInit{
    constructor(public verAoVivo: VerAoVivoService) {}
    ngOnInit(): void {
        this.verAoVivo.getDadosCompletos()
    }
}
