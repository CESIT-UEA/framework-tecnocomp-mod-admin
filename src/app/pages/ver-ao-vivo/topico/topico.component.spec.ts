import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicoComponent } from './topico.component';

describe('TopicoComponent', () => {
  let component: TopicoComponent;
  let fixture: ComponentFixture<TopicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopicoComponent]
    });
    fixture = TestBed.createComponent(TopicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
