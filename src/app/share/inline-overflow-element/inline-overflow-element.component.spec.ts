import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineOverflowElementComponent } from './inline-overflow-element.component';

describe('InlineOverflowElementComponent', () => {
  let component: InlineOverflowElementComponent;
  let fixture: ComponentFixture<InlineOverflowElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineOverflowElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InlineOverflowElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
