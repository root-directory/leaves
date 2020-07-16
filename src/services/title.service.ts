import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  title = new BehaviorSubject('Root Directory');
  title$ = this.title.asObservable();

  setTitle(title: string) {
    this.title.next(title);
  }
  getTitle(): Observable<string>{
    return this.title$;
  }
  constructor() { }
}
