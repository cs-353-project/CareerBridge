import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessSkillDialogComponent } from './assess-skill-dialog.component';

describe('AssessSkillDialogComponent', () => {
  let component: AssessSkillDialogComponent;
  let fixture: ComponentFixture<AssessSkillDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessSkillDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessSkillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
