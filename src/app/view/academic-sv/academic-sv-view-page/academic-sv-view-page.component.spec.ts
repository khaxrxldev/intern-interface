import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicSvViewPageComponent } from './academic-sv-view-page.component';

describe('AcademicSvViewPageComponent', () => {
  let component: AcademicSvViewPageComponent;
  let fixture: ComponentFixture<AcademicSvViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicSvViewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicSvViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
