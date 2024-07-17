import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { take } from 'rxjs';
import {
  Location
} from '../../models/units-response.model';
import { UnitsService } from '../../services/units.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  formGroup!: FormGroup;
  readonly weekDays = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'];
  readonly workoutPeriod = [
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

  @Output() submitEvent = new EventEmitter<boolean>();
  @Output() clearEvent = new EventEmitter<boolean>();

  private readonly formBuilder = inject(FormBuilder);
  private readonly unitsService = inject(UnitsService);

  constructor() {
    this.formGroup = this.formBuilder.group({
      workoutPeriod: this.workoutPeriod[0].valueBack,
      showClosedUnits: false,
    });
  }

  extractOpenCloseHour(workoutPeriod: string){
    const workoutPeriodSplitted = workoutPeriod.replaceAll('h', '').split(' ');
    const openHour = Number(workoutPeriodSplitted[0]);
    const closeHour = Number(workoutPeriodSplitted[2]);
    return { openHour, closeHour };
  }

  filterUnits(opened: boolean, workoutPeriod: string) {
    const weekDay = this.weekDays[new Date().getDay()];
    const { openHour, closeHour } = this.extractOpenCloseHour(workoutPeriod);

    console.log({
      opened,
      weekDay,
      openHour,
      closeHour,
    });

    this.unitsService
      .getAll()
      .pipe(
        take(1),
        /*map((data: UnitsResponse) => {
          if (data.locations) {
            return data.locations.filter((location: Location) => {
              if (location.schedules) {
                return location.schedules.filter((schedule: Schedule) => {
                  if (schedule.hour !== 'Fechada') {
                    return schedule.
                  }
                });
              }
              return false;
            });
          }
          return [];
        })*/
      )
      .subscribe((data: Location[]) => {
        this.filteredResults = data;
      });
  }

  onClear() {
    this.formGroup.get('workoutPeriod')?.setValue(this.workoutPeriod[0].valueBack);
    this.formGroup.get('showClosedUnits')?.setValue(false);

    this.filteredResults = [];
    this.clearEvent.emit(true);
  }

  onSubmit() {
    const opened = this.formGroup.get('showClosedUnits')?.value;
    const workoutPeriodForm = this.formGroup.get('workoutPeriod')?.value;
    this.filterUnits(opened, workoutPeriodForm);
    this.submitEvent.emit(true);
  }
}
