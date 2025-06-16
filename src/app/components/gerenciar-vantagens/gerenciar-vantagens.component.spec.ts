import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarVantagensComponent } from './gerenciar-vantagens.component';

describe('GerenciarVantagensComponent', () => {
  let component: GerenciarVantagensComponent;
  let fixture: ComponentFixture<GerenciarVantagensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciarVantagensComponent]
    });
    fixture = TestBed.createComponent(GerenciarVantagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
