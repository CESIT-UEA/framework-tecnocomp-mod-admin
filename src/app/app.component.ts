import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cadastro_lms';
  
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.aplicarTemaSalvo();
  }
}
