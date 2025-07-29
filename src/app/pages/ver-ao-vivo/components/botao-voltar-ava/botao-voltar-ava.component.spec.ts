import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoVoltarAvaComponent } from './botao-voltar-ava.component';

describe('BotaoVoltarAvaComponent', () => {
  let component: BotaoVoltarAvaComponent;
  let fixture: ComponentFixture<BotaoVoltarAvaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotaoVoltarAvaComponent]
    });
    fixture = TestBed.createComponent(BotaoVoltarAvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
