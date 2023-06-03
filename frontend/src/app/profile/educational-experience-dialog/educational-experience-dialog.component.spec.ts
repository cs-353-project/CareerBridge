import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalExperienceDialogComponent } from './educational-experience-dialog.component';

describe('EducationalExperienceDialogComponent', () => {
  let component: EducationalExperienceDialogComponent;
  let fixture: ComponentFixture<EducationalExperienceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationalExperienceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalExperienceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
