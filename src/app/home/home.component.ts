import { Component, OnInit } from '@angular/core';

// FORM STUFF
import { PlantService } from '../../services/plant.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  constructor(private plantService: PlantService, private titleService: TitleService, ) { }
  userName = 'Cassie';

  ngOnInit(): void {
    this.titleService.setTitle('Home');
  }

}

