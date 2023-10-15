import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationViewPageComponent } from './evaluation-view-page.component';

describe('EvaluationViewPageComponent', () => {
  let component: EvaluationViewPageComponent;
  let fixture: ComponentFixture<EvaluationViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationViewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
