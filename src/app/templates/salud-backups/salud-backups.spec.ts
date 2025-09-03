import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludBackups } from './salud-backups';

describe('SaludBackups', () => {
  let component: SaludBackups;
  let fixture: ComponentFixture<SaludBackups>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaludBackups]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaludBackups);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
