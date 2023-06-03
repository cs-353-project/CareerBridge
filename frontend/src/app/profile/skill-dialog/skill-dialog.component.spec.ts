import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillDialogComponent } from './skill-dialog.component';

describe('SkillDialogComponent', () => {
  let component: SkillDialogComponent;
  let fixture: ComponentFixture<SkillDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
