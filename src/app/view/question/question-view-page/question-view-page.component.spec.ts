import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionViewPageComponent } from './question-view-page.component';

describe('QuestionViewPageComponent', () => {
  let component: QuestionViewPageComponent;
  let fixture: ComponentFixture<QuestionViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionViewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
