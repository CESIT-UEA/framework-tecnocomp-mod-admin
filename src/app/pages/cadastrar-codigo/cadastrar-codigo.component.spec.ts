import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarCodigoComponent } from './cadastrar-codigo.component';

describe('CadastrarCodigoComponent', () => {
  let component: CadastrarCodigoComponent;
  let fixture: ComponentFixture<CadastrarCodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastrarCodigoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

