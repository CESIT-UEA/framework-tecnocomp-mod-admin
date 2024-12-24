import { Component, Input } from '@angular/core';
import { User } from 'src/interfaces/user';

@Component({
  selector: 'app-cards-usuarios',
  templateUrl: './cards-usuarios.component.html',
  styleUrls: ['./cards-usuarios.component.css']
})
export class CardsUsuariosComponent {
@Input() user!: User;

}
