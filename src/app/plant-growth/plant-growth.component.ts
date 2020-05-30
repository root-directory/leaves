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
  journalEntries:JournalEntry[];
  id:number;
  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.plantService.getJournal(this.id).subscribe(journal=> {console.log(journal);return this.journalEntries = journal.journalEntries});
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
