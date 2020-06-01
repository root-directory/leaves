import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  title = new BehaviorSubject('Root Directory');

  setTitle(title: string) {
    this.title.next(title);
  }
  constructor() { }
}
