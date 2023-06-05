import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiographyDialogComponent } from './biography-dialog.component';

describe('BiographyDialogComponent', () => {
  let component: BiographyDialogComponent;
  let fixture: ComponentFixture<BiographyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiographyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiographyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
