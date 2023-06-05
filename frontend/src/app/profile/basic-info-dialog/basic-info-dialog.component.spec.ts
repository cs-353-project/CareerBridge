import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoDialogComponent } from './basic-info-dialog.component';

describe('BasicInfoDialogComponent', () => {
  let component: BasicInfoDialogComponent;
  let fixture: ComponentFixture<BasicInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
