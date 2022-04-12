import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'timeago'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string): any {
    if (!value) return value;
    return formatDistanceToNow(new Date(value));
  }
}
