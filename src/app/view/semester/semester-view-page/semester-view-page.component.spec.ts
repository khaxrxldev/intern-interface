import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterViewPageComponent } from './semester-view-page.component';

describe('SemesterViewPageComponent', () => {
  let component: SemesterViewPageComponent;
  let fixture: ComponentFixture<SemesterViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterViewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemesterViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
