import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnAngularComponent } from './learn-angular.component';

describe('LearnAngularComponent', () => {
  let component: LearnAngularComponent;
  let fixture: ComponentFixture<LearnAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnAngularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LearnAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
