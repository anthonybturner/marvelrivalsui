import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroRole'
})
export class HeroRolePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
