import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnitResponse } from '../models/units-response.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  http = inject(HttpClient);

  getAll(): Observable<UnitResponse> {
    return this.http.get<UnitResponse>(environment.apiURL);
  }
}
