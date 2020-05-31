import { Component } from '@angular/core';
import { TitleService } from './title.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '';
  userName = 'Cassie';

  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.title.subscribe(title => {
      this.title = title;
    })
  }
}
