import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarClonagemFichaComponent } from './confirmar-clonagem-ficha.component';

describe('ConfirmarClonagemFichaComponent', () => {
  let component: ConfirmarClonagemFichaComponent;
  let fixture: ComponentFixture<ConfirmarClonagemFichaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmarClonagemFichaComponent]
    });
    fixture = TestBed.createComponent(ConfirmarClonagemFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
