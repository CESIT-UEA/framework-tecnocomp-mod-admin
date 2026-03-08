import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTopicoComponent } from './video-topico.component';

describe('VideoTopicoComponent', () => {
  let component: VideoTopicoComponent;
  let fixture: ComponentFixture<VideoTopicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoTopicoComponent]
    });
    fixture = TestBed.createComponent(VideoTopicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
