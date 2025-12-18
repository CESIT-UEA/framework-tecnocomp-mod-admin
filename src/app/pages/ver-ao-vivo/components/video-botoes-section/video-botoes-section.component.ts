import { Component } from '@angular/core';
import { VerAoVivoService } from 'src/app/services/ver-ao-vivo.service';

@Component({
  selector: 'app-video-botoes-section',
  templateUrl: './video-botoes-section.component.html',
  styleUrls: ['./video-botoes-section.component.css'],
})
export class VideoBotoesSectionComponent {
  constructor(public verAoVivo: VerAoVivoService) {}

}
