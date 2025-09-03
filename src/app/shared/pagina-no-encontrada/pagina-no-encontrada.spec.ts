import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaNoEncontrada } from './pagina-no-encontrada';

describe('PaginaNoEncontrada', () => {
  let component: PaginaNoEncontrada;
  let fixture: ComponentFixture<PaginaNoEncontrada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaNoEncontrada]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaNoEncontrada);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
