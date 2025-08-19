import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titulo-secao',
  templateUrl: './titulo-secao.component.html',
  styleUrls: ['./titulo-secao.component.css']
})
export class TituloSecaoComponent {
@Input() titulo: string = '';
@Input() caminhoUrl: string = '';
@Input() quantidade: number = 1;
@Input() nomeCard: string = '';

}
