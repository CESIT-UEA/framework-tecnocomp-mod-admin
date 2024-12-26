import { Component, Input, OnInit } from '@angular/core';
import { Topico } from 'src/interfaces/topico/Topico';

@Component({
  selector: 'app-card-topicos',
  templateUrl: './card-topicos.component.html',
  styleUrls: ['./card-topicos.component.css']
})
export class CardTopicosComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.topico)
  }
  @Input() topico!: Topico;


}
