import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UnitsService } from '../../services/units.service';
import { UnitResponse } from '../../models/units-response.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  formGroup!: FormGroup;
  readonly workoutPeriod: { key: string; value: string }[] = [
    {
      key: 'Manhã',
      value: '06:00 às 12:00',
    },
    {
      key: 'Tarde',
      value: '12:01 às 18:00',
    },
    {
      key: 'Noite',
      value: '18:01 às 23:00',
    },
  ];
  results = [];

  private readonly formBuilder = inject(FormBuilder);
  private readonly unitsService = inject(UnitsService);

  constructor() {
    this.formGroup = this.formBuilder.group({
      workoutPeriod: null,
      showClosedUnits: false,
    })
  }

  ngOnInit(): void {
    this.unitsService.getAll().pipe(take(1)).subscribe((data: UnitResponse) => {
      console.log(data);
    })
  }

  onSubmit() {
    console.log(this.formGroup.value)
  }
}
