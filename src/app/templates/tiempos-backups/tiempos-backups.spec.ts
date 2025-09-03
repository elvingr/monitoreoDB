import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiemposBackups } from './tiempos-backups';

describe('TiemposBackups', () => {
  let component: TiemposBackups;
  let fixture: ComponentFixture<TiemposBackups>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiemposBackups]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiemposBackups);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
