export interface UnitResponse {
  current_country_id: number;
  locations: Location[];
}

export interface Location {
  id: number;
  title: string;
  content: string;
  opened: boolean;
  mask: string;
  towel: string;
  fountain: string;
  locker_room: string;
  schedules: Schedule[];
}

export interface Schedule {
  weekdays: string;
  hour: string;
}
