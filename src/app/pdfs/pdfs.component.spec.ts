import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfsComponent } from './pdfs.component';

describe('PdfsComponent', () => {
  let component: PdfsComponent;
  let fixture: ComponentFixture<PdfsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfsComponent]
    });
    fixture = TestBed.createComponent(PdfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
