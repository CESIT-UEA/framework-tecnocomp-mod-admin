import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-questao-aberta',
  templateUrl: './questao-aberta.component.html',
  styleUrls: ['./questao-aberta.component.css']
})
export class QuestaoAbertaComponent {
  @Input() exercicio: any;
}
