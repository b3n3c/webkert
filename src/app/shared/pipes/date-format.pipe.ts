import { Pipe, PipeTransform } from '@angular/core';
import {formatDate} from "@angular/common";

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string | Date, format: string = 'yyyy-MM-dd'): string {
    return formatDate(value, format, 'en-US');
  }

}
