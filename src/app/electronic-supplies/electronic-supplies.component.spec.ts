import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicSuppliesComponent } from './electronic-supplies.component';

describe('ElectronicSuppliesComponent', () => {
  let component: ElectronicSuppliesComponent;
  let fixture: ComponentFixture<ElectronicSuppliesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectronicSuppliesComponent]
    });
    fixture = TestBed.createComponent(ElectronicSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
