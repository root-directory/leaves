import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../services/in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ForestComponent } from './forest/forest.component';
import { HomeComponent } from './home/home.component';
import { PlantOverviewComponent } from './plant-overview/plant-overview.component';
import { PlantCareComponent } from './plant-care/plant-care.component';
import { PlantGrowthComponent } from './plant-growth/plant-growth.component';
import { PlantUploadComponent } from './plant-upload/plant-upload.component';
import { PlantNewComponent } from './plant-new/plant-new.component';
import { CareFormComponent } from './care-form/care-form.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducer } from '../Rx/plants.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PlantEffects } from '../Rx/plants.effects';
import { metaReducers, ROOT_REDUCERS } from '../Rx/rx.index';
import { HeaderComponent } from './header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    ForestComponent,
    HomeComponent,
    PlantOverviewComponent,
    PlantCareComponent,
    PlantGrowthComponent,
    PlantUploadComponent,
    PlantNewComponent,
    CareFormComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forRoot([PlantEffects]),
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
    //   dataEncapsulation: false,
    // }),
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        // strictStateImmutability and strictActionImmutability are enabled by default
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
      },
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
