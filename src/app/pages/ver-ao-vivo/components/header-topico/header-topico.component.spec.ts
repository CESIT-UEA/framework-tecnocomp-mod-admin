import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTopicoComponent } from './header-topico.component';

describe('HeaderTopicoComponent', () => {
  let component: HeaderTopicoComponent;
  let fixture: ComponentFixture<HeaderTopicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderTopicoComponent]
    });
    fixture = TestBed.createComponent(HeaderTopicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
