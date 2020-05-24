import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForestComponent } from './forest/forest.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'forest', component: ForestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
