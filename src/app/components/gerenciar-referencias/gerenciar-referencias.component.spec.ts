import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarReferenciasComponent } from './gerenciar-referencias.component';

describe('GerenciarReferenciasComponent', () => {
  let component: GerenciarReferenciasComponent;
  let fixture: ComponentFixture<GerenciarReferenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciarReferenciasComponent]
    });
    fixture = TestBed.createComponent(GerenciarReferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
