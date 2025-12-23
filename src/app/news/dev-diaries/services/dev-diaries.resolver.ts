import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IDevDiary } from '../data/dev-diaries.model'
import { IDevDiariesResponse } from '../data/dev-diaries-response';
import { DevDiaryService } from './dev-diaries.service';

@Injectable({
  providedIn: 'root'
})
export class DevDiariesResolver implements Resolve<Observable<IDevDiariesResponse>> {
  constructor(private devDiariesService: DevDiaryService) { }

  resolve(): Observable<IDevDiariesResponse> {
    return this.devDiariesService.getAll().pipe(
      map((response: IDevDiariesResponse) => {
        // You can perform any additional processing here if needed
        return response;
      })
    );
  }
} 
