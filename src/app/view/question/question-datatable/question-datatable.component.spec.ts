import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDatatableComponent } from './question-datatable.component';

describe('QuestionDatatableComponent', () => {
  let component: QuestionDatatableComponent;
  let fixture: ComponentFixture<QuestionDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionDatatableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
