import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'secondsToMinutes',
    standalone: true
})
export class SecondsToMinutesPipe implements PipeTransform {
  transform(value: number): string {
    const minutes = Math.floor(value / 60);
    const seconds = Math.round(value % 60);
    return `${minutes}m ${seconds}s`;
  }
}
