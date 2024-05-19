import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostdialogComponent } from './postdialog.component';

describe('PostdialogComponent', () => {
  let component: PostdialogComponent;
  let fixture: ComponentFixture<PostdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostdialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
