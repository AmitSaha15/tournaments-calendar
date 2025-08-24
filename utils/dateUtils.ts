import moment from 'moment';

export const formatDateToIST = (dateString: string): string => {
  return moment(dateString).utcOffset('+05:30').format('DD MMM YYYY');
};

export const formatTimeToIST = (dateString: string): string => {
  return moment(dateString).utcOffset('+05:30').format('hh:mm A');
};

export const formatDateForCalendar = (dateString: string): string => {
  return moment(dateString).utcOffset('+05:30').format('YYYY-MM-DD');
};

export const formatDateRange = (startDate: string, endDate?: string): string => {
  const start = moment(startDate).utcOffset('+05:30');
  if (endDate) {
    const end = moment(endDate).utcOffset('+05:30');
    return `${start.format('DD MMM YYYY')} - ${end.format('DD MMM YYYY')}`;
  }
  return start.format('DD MMM YYYY');
};

export const getCurrentMonth = (): string => {
  return moment().format('MMM YYYY');
};

export const getCalendarMonth = (date: Date): string => {
  return moment(date).format('MMM YYYY');
};
