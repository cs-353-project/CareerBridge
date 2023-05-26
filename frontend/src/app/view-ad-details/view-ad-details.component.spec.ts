import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdDetailsComponent } from './view-ad-details.component';

describe('ViewAdDetailsComponent', () => {
  let component: ViewAdDetailsComponent;
  let fixture: ComponentFixture<ViewAdDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
