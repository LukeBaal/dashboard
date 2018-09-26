export interface Event {
  id?: string;
  name: string;
  location?: string;
  crn?: number;
  day: number;
  start: string;
  end: string;
  biweekly?: boolean;
  week?: string;
}
