import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Location } from '../../models/units-response.model';
import { UnitsService } from '../../services/units.service';
import { FilterUnitsService } from './../../services/filter-units.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  formGroup!: FormGroup;
  readonly workoutPeriodForm = [
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
  filteredResults: Location[] = [];

  @Output() submitEvent = new EventEmitter<boolean>();
  @Output() clearEvent = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private unitsService: UnitsService,
    private filterUnitsService: FilterUnitsService
  ) {
    this.createForm();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos Privados
  // -----------------------------------------------------------------------------------------------------

  private createForm() {
    this.formGroup = this.formBuilder.group({
      workoutPeriod: this.workoutPeriodForm[0].valueBack,
      showClosedUnits: false,
    });
  }

  private resetForm() {
    this.showClosedUnitsFormControl?.setValue(false);
    this.workoutPeriodFormControl?.setValue(
      this.workoutPeriodForm[0].valueBack
    );
    this.filteredResults = [];
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos Públicos
  // -----------------------------------------------------------------------------------------------------

  onClear() {
    this.resetForm();
    this.clearEvent.emit(true);
  }

  onSubmit() {
    const showClosedUnits = this.showClosedUnitsFormControl?.value;
    const workoutPeriod = this.workoutPeriodFormControl?.value;
    this.unitsService.getAll().subscribe((data) => {
      this.filteredResults = this.filterUnitsService.filterUnits(
         data,
         showClosedUnits,
         workoutPeriod
       );
       this.unitsService.setFilteredList(this.filteredResults)
       this.submitEvent.emit(true);
    })
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Getters
  // -----------------------------------------------------------------------------------------------------

  get showClosedUnitsFormControl() {
    return this.formGroup?.get('showClosedUnits') as FormControl;
  }

  get workoutPeriodFormControl() {
    return this.formGroup?.get('workoutPeriod') as FormControl;
  }
}
