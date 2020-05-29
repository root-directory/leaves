import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../types/plant';
import { JournalEntry } from '../journalEntry';

@Component({
  selector: 'app-plant-growth',
  templateUrl: './plant-growth.component.html',
  styleUrls: ['./plant-growth.component.scss']
})
export class PlantGrowthComponent implements OnInit {
  plant: Plant;
  journalEntry:JournalEntry[];
  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.plantService.getJournal(id).subscribe(journalEntry=> this.journalEntry = journalEntry);
  }

  getPlant(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.plantService.getPlant(id)
      .subscribe(plant => this.plant = plant);
  }

  goBack(): void {
    this.location.back();
  }
}
