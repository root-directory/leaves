import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForestComponent } from './forest/forest.component';
import { HomeComponent } from './home/home.component';
import { PlantUploadComponent } from './plant-upload/plant-upload.component';
import { PlantOverviewComponent } from './plant-overview/plant-overview.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'forest', component: ForestComponent, pathMatch:'full' },
  { path: 'forest/:id/upload',component:PlantUploadComponent, pathMatch:'full'},
  { path: 'forest/:id/plant-overview',component:PlantOverviewComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
