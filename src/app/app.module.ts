import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForestComponent } from './forest/forest.component';
import { HomeComponent } from './home/home.component';
import { PlantOverviewComponent } from './plant-overview/plant-overview.component';
import { PlantCareComponent } from './plant-care/plant-care.component';
import { PlantGrowthComponent } from './plant-growth/plant-growth.component';
import { PlantUploadComponent } from './plant-upload/plant-upload.component';
import { PlantNewComponent } from './plant-new/plant-new.component';

@NgModule({
  declarations: [
    AppComponent,
    ForestComponent,
    HomeComponent,
    PlantOverviewComponent,
    PlantCareComponent,
    PlantGrowthComponent,
    PlantUploadComponent,
    PlantNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }