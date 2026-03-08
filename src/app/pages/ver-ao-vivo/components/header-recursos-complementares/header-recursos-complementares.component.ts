import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-recursos-complementares',
  templateUrl: './header-recursos-complementares.component.html',
  styleUrls: ['./header-recursos-complementares.component.css']
})
export class HeaderRecursosComplementaresComponent {
  @Input() icone!: string;
  @Input() texto!: string;
}
