import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-section',
  templateUrl: './video-section.component.html',
  styleUrls: ['./video-section.component.css']
})
export class VideoSectionComponent {
  @Input() videoUrl!: any;
}
