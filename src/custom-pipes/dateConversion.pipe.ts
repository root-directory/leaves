import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DateConversion',
})
export class DateConversionPipe implements PipeTransform {
  transform(
    value: number,
    originalFormat: string,
    newFormat: string
  ): number {
    const conversionLookup = {
      week: 1000 * 60 * 60 * 24 * 7,
      day: 1000 * 60 * 60 * 24,
      hr: 1000 * 60 * 60,
      min: 1000 * 60,
      sec: 1000,
      ms: 1,
    };
    const conversion =
      conversionLookup[originalFormat] / conversionLookup[newFormat];
    return value * conversion;
  }
}
