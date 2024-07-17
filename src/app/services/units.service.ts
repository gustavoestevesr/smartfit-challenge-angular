import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Location, UnitsResponse } from '../models/units-response.model';

@Injectable({
  providedIn: 'root',
})
export class UnitsService {
  private allUnitsSubject$: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  private allUnits$: Observable<Location[]> = this.allUnitsSubject$.asObservable();
  private filteredUnits: Location[] = [];

  constructor(private http: HttpClient) {
    this.loadUnits();
  }

  private async loadUnits() {
    try {
      const data: UnitsResponse = await firstValueFrom(this.http.get<UnitsResponse>(environment.apiURL));
      this.allUnitsSubject$.next(data.locations);
      this.filteredUnits = data.locations;
    } catch (error) {
      console.error('Failed to load units:', error);
    }
  }

  getAll(): Observable<Location[]> {
    return this.allUnits$;
  }

  setFilteredList(newValue: Location[]) {
    this.filteredUnits = newValue;
  }

  getFilteredList(): Location[] {
    return this.filteredUnits;
  }
}
