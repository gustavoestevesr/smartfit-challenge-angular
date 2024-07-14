import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

enum TURNOS {
  MANHA,
  TARDE,
  NOITE,
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  readonly workPeriod: { key: string; value: string }[] = [
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
}
