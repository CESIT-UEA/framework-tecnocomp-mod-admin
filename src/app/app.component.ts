import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { MatIconRegistry } from '@angular/material/icon'; // Importe aqui
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cadastro_lms';
  
  constructor(
    private themeService: ThemeService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'estrela',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/estrela_icons.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'perfil',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/perfil_icons.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'modulos',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/modulos_icons.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'plataformas',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/plataformas_icons.svg')
    );
  }

  ngOnInit(): void {
    this.themeService.aplicarTemaSalvo();
  }
}
