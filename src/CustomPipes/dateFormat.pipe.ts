import { Constants } from '../Constants/constants';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'DateFormat',
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const _value = parseInt(value);
    const secDiff = Math.floor((Date.now() - _value) / 1000);
    const dayDiff = Math.floor(secDiff / 86400);

    if (dayDiff < 30) {
      return this.convertToPrettyDate(secDiff, dayDiff);
    } else {
      return super.transform(value, Constants.DATE_FMT);
    }
  }

  convertToPrettyDate(secDiff: number, dayDiff: number) {
    if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) return '';

    if (dayDiff == 0) {
      return (
        (secDiff < 60 && 'Just now') ||
        (secDiff < 120 && '1 minute ago') ||
        (secDiff < 3600 && Math.floor(secDiff / 60) + ' minutes ago') ||
        (secDiff < 7200 && '1 hour ago') ||
        (secDiff < 86400 && Math.floor(secDiff / 3600) + ' hours ago')
      );
    } else {
      return (
        (dayDiff == 1 && 'Yesterday') ||
        (dayDiff < 7 && dayDiff + ' days ago') ||
        (dayDiff < 31 && Math.ceil(dayDiff / 7) + ' week(s) ago')
      );
    }
  }
}
