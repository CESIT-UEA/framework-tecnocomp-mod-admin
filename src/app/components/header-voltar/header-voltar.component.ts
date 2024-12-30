import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-voltar',
  templateUrl: './header-voltar.component.html',
  styleUrls: ['./header-voltar.component.css']
})
export class HeaderVoltarComponent {
@Input() texto: String = ''
@Input() caminhoVoltar: String = ''

constructor(private location: Location){}

voltarPagina() {
  this.location.back();
}
}
