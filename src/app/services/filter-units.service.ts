import { Injectable } from '@angular/core';
import { Location, Schedule } from '../models/units-response.model';

@Injectable({
  providedIn: 'root',
})
export class FilterUnitsService {
  constructor() {}

  filterUnits(
    listOfUnits: Location[],
    showClosed: boolean,
    workoutPeriod: string,
  ) {
    let filteredList: Location[] = listOfUnits;
    const { openHour: openHourFilter, closeHour: closeHourFilter } = this.extractOpenCloseHour(workoutPeriod);

    // Filter based on whether units should be shown if they are closed or not
    if (!showClosed) {
      filteredList = filteredList.filter((unit: Location) => {
        return unit.opened && unit.opened === true;
      });
    }

    if (openHourFilter && closeHourFilter) {
      filteredList = filteredList.filter((unit: Location) => {
        if (unit.schedules) {
          return unit.schedules.some((schedule: Schedule) => {
            if (schedule.hour && schedule.hour.toString() !== 'Fechada') {
              const { openHour, closeHour } = this.extractOpenCloseHour(schedule.hour);
              return openHourFilter <= openHour && closeHourFilter >= closeHour;
            }
            return false;
          });
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
}
