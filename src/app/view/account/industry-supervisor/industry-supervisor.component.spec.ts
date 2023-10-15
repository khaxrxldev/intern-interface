import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrySupervisorComponent } from './industry-supervisor.component';

describe('IndustrySupervisorComponent', () => {
  let component: IndustrySupervisorComponent;
  let fixture: ComponentFixture<IndustrySupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustrySupervisorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustrySupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
