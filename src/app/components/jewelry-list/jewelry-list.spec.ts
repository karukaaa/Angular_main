import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JewelryList } from './jewelry-list';

describe('JewelryList', () => {
  let component: JewelryList;
  let fixture: ComponentFixture<JewelryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JewelryList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JewelryList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
