import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractComponent } from './abstract.component';

describe('AbstractComponent', () => {
  let component: AbstractComponent;
  let fixture: ComponentFixture<AbstractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbstractComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbstractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
