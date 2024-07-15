import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { UnitResponse } from '../models/units-response.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UnitsService {
  private unitsCache$ = new BehaviorSubject<UnitResponse | null>(null);

  http = inject(HttpClient);

  getAll(): Observable<UnitResponse> {
    if (this.unitsCache$.getValue() !== null) {
      return this.unitsCache$ as Observable<UnitResponse>;
    }
    return this.http.get<UnitResponse>(environment.apiURL).pipe(
      tap((data: UnitResponse) => this.unitsCache$.next(data)),
      switchMap(() => this.unitsCache$ as Observable<UnitResponse>)
    );
  }
}
