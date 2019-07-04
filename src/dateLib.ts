export function equalYear(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear()
  );
}

export function equalMonth(date1: Date, date2: Date) {
  return (
    equalYear(date1, date2) &&
    date1.getMonth() === date2.getMonth()
  );
}

export function equalDate(date1: Date, date2: Date) {
  return (
    equalMonth(date1, date2) &&
    date1.getDate() === date2.getDate()
  );
}

export function equal(date1: Date, date2: Date) {
  return (
    equalDate(date1, date2)
  );
}


export function isBetweenYear(date: Date, date1: Date, date2: Date) {
  return (
    date1.getFullYear() <= date.getFullYear() &&
    date2.getFullYear() >= date.getFullYear()
  );
}

export function isBetweenMonth(date: Date, date1: Date, date2: Date) {
  return (
    isBetweenYear(date, date1, date2) &&
    date1.getMonth() <= date.getMonth() &&
    date2.getMonth() >= date.getMonth()
  );
}

export function isBetweenDate(date: Date, date1: Date, date2: Date) {
  return (
    isBetweenMonth(date, date1, date2) &&
    date1.getDate() <= date.getDate() &&
    date2.getDate() >= date.getDate()
  );
}

export function getWeekdayDate(date, dayInWeek) {
  const _date = new Date(date);
  const day = _date.getDay(),
    diff = _date.getDate() - day + (day === 0 ? -6 : dayInWeek);
  return new Date(_date.setDate(diff));
}


export function nextWeekdayDate(date, dayInWeek) {
  const ret = new Date(date);
  ret.setDate(ret.getDate() + (dayInWeek - ret.getDay() + 7) % 7);
  return ret;
}
