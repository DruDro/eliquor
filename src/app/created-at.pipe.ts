import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'createdAt'
})
export class CreatedAtPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const uglyDate = new Date(value);
    const beautifulDate = `${('0' + (uglyDate.getDate())).slice(-2)}.${('0' + (uglyDate.getMonth() + 1)).slice(-2)}.${uglyDate.getFullYear()}`;
    return beautifulDate;
  }

}
