import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUnitsComponent } from './list-units.component';

describe('ListUnitsComponent', () => {
  let component: ListUnitsComponent;
  let fixture: ComponentFixture<ListUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUnitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
