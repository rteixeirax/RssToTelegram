/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import dayjs, { Dayjs } from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { DATE_LOCALE } from '../constants';

const diff = (date1: string | Dayjs, date2: string | Dayjs): number => {
  let theDate1;
  let theDate2;

  if (typeof date1 === 'string') {
    theDate1 = dayjs(date1);
  } else {
    theDate1 = date1;
  }

  if (typeof date2 === 'string') {
    theDate2 = dayjs(date2);
  } else {
    theDate2 = date2;
  }

  return theDate1.diff(theDate2);
};

const display = (date: string): string => {
  return dayjs(date).format('L LTS');
};

const displayNow = (): string => {
  return dayjs().format('L LTS');
};

const isAfter = (date: string, newDate: string): boolean => {
  return dayjs(newDate).isAfter(dayjs(date));
};

const now = (): Dayjs => {
  return dayjs();
};

const setLocal = (): void => {
  const locale = require(`dayjs/locale/${DATE_LOCALE?.toLowerCase()}`);

  dayjs.extend(localizedFormat).locale(locale);
};

export default {
  diff,
  display,
  displayNow,
  isAfter,
  now,
  setLocal,
};
