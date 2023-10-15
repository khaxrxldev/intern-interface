import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaQuestionDatatableComponent } from './criteria-question-datatable.component';

describe('CriteriaQuestionDatatableComponent', () => {
  let component: CriteriaQuestionDatatableComponent;
  let fixture: ComponentFixture<CriteriaQuestionDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaQuestionDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriteriaQuestionDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
