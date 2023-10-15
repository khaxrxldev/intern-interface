import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicSupervisorComponent } from './academic-supervisor.component';

describe('AcademicSupervisorComponent', () => {
  let component: AcademicSupervisorComponent;
  let fixture: ComponentFixture<AcademicSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicSupervisorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
