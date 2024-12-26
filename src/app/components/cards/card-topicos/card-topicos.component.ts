import { Component, Input } from '@angular/core';
import { Topico } from 'src/interfaces/topico/Topico';

@Component({
  selector: 'app-card-topicos',
  templateUrl: './card-topicos.component.html',
  styleUrls: ['./card-topicos.component.css']
})
export class CardTopicosComponent {
  @Input() topico!: Topico;
}
