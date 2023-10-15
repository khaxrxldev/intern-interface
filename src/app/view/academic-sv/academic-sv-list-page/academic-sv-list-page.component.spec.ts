import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicSvListPageComponent } from './academic-sv-list-page.component';

describe('AcademicSvListPageComponent', () => {
  let component: AcademicSvListPageComponent;
  let fixture: ComponentFixture<AcademicSvListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicSvListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicSvListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
