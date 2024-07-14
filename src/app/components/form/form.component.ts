import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      workoutPeriod: null,
      showClosedUnits: false,
    })
  }

  onSubmit() {
    console.log(this.formGroup.value)
  }
}
