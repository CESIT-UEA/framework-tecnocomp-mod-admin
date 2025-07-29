import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmarRemocaoComponent } from './dialog-confirmar-remocao.component';

describe('DialogConfirmarRemocaoComponent', () => {
  let component: DialogConfirmarRemocaoComponent;
  let fixture: ComponentFixture<DialogConfirmarRemocaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogConfirmarRemocaoComponent]
    });
    fixture = TestBed.createComponent(DialogConfirmarRemocaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
