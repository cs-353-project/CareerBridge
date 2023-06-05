import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntaryExperienceDialogComponent } from './voluntary-experience-dialog.component';

describe('VoluntaryExperienceDialogComponent', () => {
  let component: VoluntaryExperienceDialogComponent;
  let fixture: ComponentFixture<VoluntaryExperienceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoluntaryExperienceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoluntaryExperienceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
