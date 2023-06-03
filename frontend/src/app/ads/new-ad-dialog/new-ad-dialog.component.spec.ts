import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdDialogComponent } from './new-ad-dialog.component';

describe('NewAdDialogComponent', () => {
  let component: NewAdDialogComponent;
  let fixture: ComponentFixture<NewAdDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAdDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
