import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ml'
})
export class MlPipe implements PipeTransform {

  transform(value: any, amount: string): string {
    let am = parseInt(amount);
    return `${((isNaN(am) ? 0 : am) /100)*value}ml`;
  }

}
