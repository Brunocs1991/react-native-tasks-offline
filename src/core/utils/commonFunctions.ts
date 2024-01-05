import moment from 'moment/moment';

export function getDateFormated(date?: Date) {
  moment.updateLocale('pt-br', {});
  return moment(date).format('ddd, D [de] MMMM');
}
