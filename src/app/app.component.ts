import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { FooterComponent } from './components/footer/footer.component';
import { FormComponent } from './components/form/form.component';
import { HeaderComponent } from './components/header/header.component';
import { LegendComponent } from './components/legend/legend.component';
import { ListUnitsComponent } from './components/list-units/list-units.component';
import { Location } from './models/units-response.model';
import { UnitsService } from './services/units.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormComponent, LegendComponent, ListUnitsComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'smartfit-challenge-angular';
  showList$ = new BehaviorSubject<boolean>(false);
  listOfUnits: Location[] = [];

  readonly unitsService = inject(UnitsService);

  onSubmitEvent() {
    this.listOfUnits = this.unitsService.getFilteredList();
    this.showList$.next(true);
  }

  onClearEvent() {
    this.showList$.next(false);
  }
}
