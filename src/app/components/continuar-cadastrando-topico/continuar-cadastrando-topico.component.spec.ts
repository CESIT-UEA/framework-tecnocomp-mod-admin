import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuarCadastrandoTopicoComponent } from './continuar-cadastrando-topico.component';

describe('ContinuarCadastrandoTopicoComponent', () => {
  let component: ContinuarCadastrandoTopicoComponent;
  let fixture: ComponentFixture<ContinuarCadastrandoTopicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContinuarCadastrandoTopicoComponent]
    });
    fixture = TestBed.createComponent(ContinuarCadastrandoTopicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
