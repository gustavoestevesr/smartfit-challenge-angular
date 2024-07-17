import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../../models/units-response.model';
import { CardUnitComponent } from './card-unit/card-unit.component';

@Component({
  selector: 'app-list-units',
  standalone: true,
  imports: [CardUnitComponent],
  templateUrl: './list-units.component.html',
  styleUrl: './list-units.component.scss'
})
export class ListUnitsComponent implements OnInit {
  @Input() listOfUnits: Location[] = [];

  ngOnInit(): void {}
}
