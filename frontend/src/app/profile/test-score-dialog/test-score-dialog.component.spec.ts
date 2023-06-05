import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestScoreDialogComponent } from './test-score-dialog.component';

describe('TestScoreDialogComponent', () => {
  let component: TestScoreDialogComponent;
  let fixture: ComponentFixture<TestScoreDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestScoreDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestScoreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
