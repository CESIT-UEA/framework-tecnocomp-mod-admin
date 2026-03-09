import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoExclusaoProfessorComponent } from './confirmacao-exclusao-professor.component';

describe('ConfirmacaoExclusaoProfessorComponent', () => {
  let component: ConfirmacaoExclusaoProfessorComponent;
  let fixture: ComponentFixture<ConfirmacaoExclusaoProfessorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmacaoExclusaoProfessorComponent]
    });
    fixture = TestBed.createComponent(ConfirmacaoExclusaoProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
