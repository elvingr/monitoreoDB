import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDbConexion } from './test-db-conexion';

describe('TestDbConexion', () => {
  let component: TestDbConexion;
  let fixture: ComponentFixture<TestDbConexion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDbConexion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestDbConexion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
