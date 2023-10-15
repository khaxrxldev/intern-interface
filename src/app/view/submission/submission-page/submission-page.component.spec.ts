import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionPageComponent } from './submission-page.component';

describe('SubmissionPageComponent', () => {
  let component: SubmissionPageComponent;
  let fixture: ComponentFixture<SubmissionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmissionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
