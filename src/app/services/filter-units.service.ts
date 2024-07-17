import { Injectable } from '@angular/core';
import { Location } from '../models/units-response.model';
import { UnitsService } from './units.service';

const weekDays = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'];
const WORKOUT_HOURS = [
  {
    morning: {
      start: 6,
      end: 12,
    },
  },
  {
    afternoon: {
      start: 6,
      end: 12,
    },
  },
  {
    night: {
      start: 18,
      end: 23,
    },
  },
];

@Injectable({
  providedIn: 'root',
})
export class FilterUnitsService {
  private weekDay = weekDays[new Date().getDay()];

  constructor() {}

  filterUnits(
    listOfUnits: Location[],
    showClosed: boolean,
    workoutPeriod: string,
  ) {
    let filteredList: Location[] = listOfUnits;
    const { openHour, closeHour } = this.extractOpenCloseHour(workoutPeriod);

    // Filter based on whether units should be shown if they are closed or not
    if (!showClosed) {
      filteredList = filteredList.filter((unit: Location) => {
        if (unit.opened && unit.opened === true) {
          return true
        }
        return false;
      });
    }


    return filteredList;
  }

  extractOpenCloseHour(workoutPeriod: string) {
    const workoutPeriodSplitted = workoutPeriod.replaceAll('h', '').split(' ');
    const openHour = Number(workoutPeriodSplitted[0]);
    const closeHour = Number(workoutPeriodSplitted[2]);
    return { openHour, closeHour };
  }

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
