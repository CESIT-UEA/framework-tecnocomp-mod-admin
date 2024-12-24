import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards-cadastro',
  templateUrl: './cards-cadastro.component.html',
  styleUrls: ['./cards-cadastro.component.css']
})
export class CardsCadastroComponent {
@Input() nomeCard: string = '';
@Input() caminhoImagem: string = '';
@Input() caminhoUrl: string = '';

}
