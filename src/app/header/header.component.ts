import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss'
  ]
})
export class HeaderComponent implements OnInit {
  title = '';

  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.getTitle().subscribe((appTitle) => {
      this.title = appTitle;
      
    });
  }
}
