import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeuserComponent } from './typeuser.component';

describe('TypeuserComponent', () => {
  let component: TypeuserComponent;
  let fixture: ComponentFixture<TypeuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeuserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
