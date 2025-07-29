import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasPlataformasComponent } from './minhas-plataformas.component';

describe('MinhasPlataformasComponent', () => {
  let component: MinhasPlataformasComponent;
  let fixture: ComponentFixture<MinhasPlataformasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinhasPlataformasComponent]
    });
    fixture = TestBed.createComponent(MinhasPlataformasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
