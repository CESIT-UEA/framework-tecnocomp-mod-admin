import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlataformaPageComponent } from './plataforma-page.component';

describe('PlataformaPageComponent', () => {
  let component: PlataformaPageComponent;
  let fixture: ComponentFixture<PlataformaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlataformaPageComponent]
    });
    fixture = TestBed.createComponent(PlataformaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
