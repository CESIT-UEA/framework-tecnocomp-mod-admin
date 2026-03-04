import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClonarFichaTecnicaComponent } from './clonar-ficha-tecnica.component';

describe('ClonarFichaTecnicaComponent', () => {
  let component: ClonarFichaTecnicaComponent;
  let fixture: ComponentFixture<ClonarFichaTecnicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClonarFichaTecnicaComponent]
    });
    fixture = TestBed.createComponent(ClonarFichaTecnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
