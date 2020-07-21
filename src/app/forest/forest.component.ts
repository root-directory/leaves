import { Component, OnInit } from '@angular/core';
import { Plant } from '../types/plant';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PlantActions from '../../Rx/plants.actions';
import * as fromRoot from '../../Rx/rx.index';
import { TitleService } from '../../services/title.service';

import { DateConversionPipe } from '../../CustomPipes/dateConversion.pipe';

@Component({
  selector: 'app-forest',
  templateUrl: './forest.component.html',
  styleUrls: ['./forest.component.scss'],
})
export class ForestComponent implements OnInit {
  plants$: Observable<Plant[]>;

  constructor(
    private store: Store<fromRoot.State>,
    private titleService: TitleService
  ) {
    this.plants$ = this.store.select((state) => state.plants.entities);
  }

  ngOnInit() {
    this.store.dispatch({ type: '[Plants] Load Plants' });
    this.titleService.setTitle('My Forest');
  }

  delete(plant: Plant): void {
    this.store.dispatch(PlantActions.deletePlant({ plant }));
  }
}
