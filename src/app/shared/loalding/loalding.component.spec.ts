import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaldingComponent } from './loalding.component';

describe('LoaldingComponent', () => {
  let component: LoaldingComponent;
  let fixture: ComponentFixture<LoaldingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaldingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaldingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
