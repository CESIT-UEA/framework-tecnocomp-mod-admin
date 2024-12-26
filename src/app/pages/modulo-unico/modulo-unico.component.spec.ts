import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloUnicoComponent } from './modulo-unico.component';

describe('ModuloUnicoComponent', () => {
  let component: ModuloUnicoComponent;
  let fixture: ComponentFixture<ModuloUnicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuloUnicoComponent]
    });
    fixture = TestBed.createComponent(ModuloUnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
