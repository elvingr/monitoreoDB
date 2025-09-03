import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroBaseDatos } from './registro-base-datos';

describe('RegistroBaseDatos', () => {
  let component: RegistroBaseDatos;
  let fixture: ComponentFixture<RegistroBaseDatos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroBaseDatos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroBaseDatos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
