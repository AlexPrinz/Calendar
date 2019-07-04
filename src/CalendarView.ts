import * as React from 'react';

export interface ICalendarViewProps {
  periodChanged?: (start: Date, end: Date, month: string) => void;
  onEventChange?: () => void;
  onEventClick?: () => void;
  onEventContextMenu?: () => void;
  firstDayOfWeek?: number;
  events: Calendar.Event[];
}

export abstract class CalendarView {
  abstract nextPeriod();
  abstract previousPeriod();
}
