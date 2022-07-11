import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IyziSmsComponent } from './iyzi-sms.component';

describe('IyziSmsComponent', () => {
  let component: IyziSmsComponent;
  let fixture: ComponentFixture<IyziSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IyziSmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IyziSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
