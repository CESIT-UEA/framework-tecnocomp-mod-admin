import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksNavegacaoComponent } from './links-navegacao.component';

describe('LinksNavegacaoComponent', () => {
  let component: LinksNavegacaoComponent;
  let fixture: ComponentFixture<LinksNavegacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinksNavegacaoComponent]
    });
    fixture = TestBed.createComponent(LinksNavegacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
