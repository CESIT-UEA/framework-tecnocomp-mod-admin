import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicosModuloUnicoComponent } from './topicos-modulo-unico.component';

describe('TopicosModuloUnicoComponent', () => {
  let component: TopicosModuloUnicoComponent;
  let fixture: ComponentFixture<TopicosModuloUnicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopicosModuloUnicoComponent]
    });
    fixture = TestBed.createComponent(TopicosModuloUnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
