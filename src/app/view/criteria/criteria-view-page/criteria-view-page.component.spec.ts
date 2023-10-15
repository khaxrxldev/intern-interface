import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaViewPageComponent } from './criteria-view-page.component';

describe('CriteriaViewPageComponent', () => {
  let component: CriteriaViewPageComponent;
  let fixture: ComponentFixture<CriteriaViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaViewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriteriaViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
