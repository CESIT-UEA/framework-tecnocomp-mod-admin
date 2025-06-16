import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCriarReferenciaComponent } from './dialog-criar-referencia.component';

describe('DialogCriarReferenciaComponent', () => {
  let component: DialogCriarReferenciaComponent;
  let fixture: ComponentFixture<DialogCriarReferenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCriarReferenciaComponent]
    });
    fixture = TestBed.createComponent(DialogCriarReferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
