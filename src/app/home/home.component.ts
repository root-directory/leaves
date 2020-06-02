import { Component, OnInit } from '@angular/core';

// FORM STUFF
import { PlantService } from '../../services/plant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private plantService: PlantService) { }
  userName = 'Cassie';

  ngOnInit(): void {
  }

}

