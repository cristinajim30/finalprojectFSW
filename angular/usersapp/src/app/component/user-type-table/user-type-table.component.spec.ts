import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeTableComponent } from './user-type-table.component';

describe('UserTypeTableComponent', () => {
  let component: UserTypeTableComponent;
  let fixture: ComponentFixture<UserTypeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTypeTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
