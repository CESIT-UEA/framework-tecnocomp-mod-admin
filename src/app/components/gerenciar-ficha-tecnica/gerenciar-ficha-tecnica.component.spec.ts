import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarFichaTecnicaComponent } from './gerenciar-ficha-tecnica.component';

describe('GerenciarFichaTecnicaComponent', () => {
  let component: GerenciarFichaTecnicaComponent;
  let fixture: ComponentFixture<GerenciarFichaTecnicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciarFichaTecnicaComponent]
    });
    fixture = TestBed.createComponent(GerenciarFichaTecnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
