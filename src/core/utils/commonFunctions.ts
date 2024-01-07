import moment from 'moment/moment';

export function getDateFormated(date?: Date, formato?: string) {
  moment.updateLocale('pt-br', {});
  return moment(date).format(formato ?? 'ddd, D [de] MMMM');
}
