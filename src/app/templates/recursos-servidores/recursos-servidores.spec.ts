import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosServidores } from './recursos-servidores';

describe('RecursosServidores', () => {
  let component: RecursosServidores;
  let fixture: ComponentFixture<RecursosServidores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursosServidores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursosServidores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
