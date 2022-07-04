import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IyzipayComponent } from './iyzipay.component';

describe('IyzipayComponent', () => {
  let component: IyzipayComponent;
  let fixture: ComponentFixture<IyzipayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IyzipayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IyzipayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
