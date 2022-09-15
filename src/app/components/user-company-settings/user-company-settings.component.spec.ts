import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompanySettingsComponent } from './user-company-settings.component';

describe('UserCompanySettingsComponent', () => {
  let component: UserCompanySettingsComponent;
  let fixture: ComponentFixture<UserCompanySettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCompanySettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCompanySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
