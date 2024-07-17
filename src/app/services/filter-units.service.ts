import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterUnitsService {

  constructor() { }

  /*filterUnits(opened: boolean, workoutPeriod: string) {
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
        map((data: UnitsResponse) => {
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
        })
      )
      .subscribe((data) => {
        this.filteredResults = data.locations;
      });
  }*/
}
