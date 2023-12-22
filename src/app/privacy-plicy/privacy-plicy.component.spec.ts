import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPlicyComponent } from './privacy-plicy.component';

describe('PrivacyPlicyComponent', () => {
  let component: PrivacyPlicyComponent;
  let fixture: ComponentFixture<PrivacyPlicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivacyPlicyComponent]
    });
    fixture = TestBed.createComponent(PrivacyPlicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
