import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { filter, map, take } from 'rxjs';
import { UnitsService } from '../../services/units.service';
import {
  Location,
  Schedule,
  UnitResponse,
} from '../../models/units-response.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  formGroup!: FormGroup;
  readonly workoutPeriod: { key: string; valueFront: string; valueBack: string }[] = [
    {
      key: 'Manhã',
      valueFront: '06:00 às 12:00',
      valueBack: '06h às 12h',
    },
    {
      key: 'Tarde',
      valueFront: '12:01 às 18:00',
      valueBack: '12h às 18h',
    },
    {
      key: 'Noite',
      valueFront: '18:01 às 23:00',
      valueBack: '18h às 23h',
    },
  ];
  results: Location[] = [];
  filteredResults: Location[] = [];

  private readonly formBuilder = inject(FormBuilder);
  private readonly unitsService = inject(UnitsService);

  constructor() {
    this.formGroup = this.formBuilder.group({
      workoutPeriod: this.workoutPeriod[0].key,
      showClosedUnits: false,
    });
  }

  onSubmit() {
    this.unitsService
      .getAll()
      .pipe(
        take(1),
        map((data) => ({
          locations: data.locations.filter((location) => {
            return (
              location.opened !== this.formGroup.get('showClosedUnits')?.value &&
              location.schedules &&
              location.schedules.some((schedule: Schedule) => {
                return schedule.hour.includes(this.formGroup.get('workoutPeriod')?.value);
              })
            );
          }),
        }))
      )
      .subscribe((data) => {
        this.results = data.locations;
      });
  }
}
