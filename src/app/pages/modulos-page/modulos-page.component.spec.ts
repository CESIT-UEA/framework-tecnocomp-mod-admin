import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulosPageComponent } from './modulos-page.component';

describe('ModulosPageComponent', () => {
  let component: ModulosPageComponent;
  let fixture: ComponentFixture<ModulosPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModulosPageComponent]
    });
    fixture = TestBed.createComponent(ModulosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
