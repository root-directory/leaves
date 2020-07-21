import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe ({
  name: 'Multiplier'
})

export class MultiplierPipe implements PipeTransform {
  transform(value: number, multiply: string): number {
     const mul = parseFloat(multiply);
     return mul * value;
  }
}
