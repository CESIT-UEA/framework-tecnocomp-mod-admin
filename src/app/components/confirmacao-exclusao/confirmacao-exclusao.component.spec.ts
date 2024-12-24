import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoExclusaoComponent } from './confirmacao-exclusao.component';

describe('ConfirmacaoExclusaoComponent', () => {
  let component: ConfirmacaoExclusaoComponent;
  let fixture: ComponentFixture<ConfirmacaoExclusaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmacaoExclusaoComponent]
    });
    fixture = TestBed.createComponent(ConfirmacaoExclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
