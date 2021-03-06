import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForestComponent } from './forest/forest.component';
import { HomeComponent } from './home/home.component';
import { PlantUploadComponent } from './plant-upload/plant-upload.component';
import { PlantGrowthComponent } from './plant-growth/plant-growth.component';
import { PlantNewComponent } from './plant-new/plant-new.component';
import { CareFormComponent } from './care-form/care-form.component';
import { JournalFormComponent } from './journal-form/journal-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'forest', component: ForestComponent, pathMatch: 'full' },
  { path: 'forest/new-plant', component: PlantNewComponent, pathMatch: 'full'},
  { path: 'forest/:id/upload', component: PlantUploadComponent, pathMatch: 'full'},
  { path: 'forest/:id/plant-growth', component: PlantGrowthComponent, pathMatch: 'full'},
  { path: 'forest/:id/care-form', component: CareFormComponent, pathMatch: 'full' },
  { path: 'forest/:id/plant-growth/new', component: JournalFormComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
