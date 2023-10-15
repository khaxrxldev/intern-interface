import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaListPageComponent } from './criteria-list-page.component';

describe('CriteriaListPageComponent', () => {
  let component: CriteriaListPageComponent;
  let fixture: ComponentFixture<CriteriaListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriteriaListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
