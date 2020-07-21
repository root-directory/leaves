import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from '../services/in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ForestComponent } from './forest/forest.component';
import { HomeComponent } from './home/home.component';
import { PlantGrowthComponent } from './plant-growth/plant-growth.component';
import { PlantUploadComponent } from './plant-upload/plant-upload.component';
import { PlantNewComponent } from './plant-new/plant-new.component';
import { CareFormComponent } from './care-form/care-form.component';
import { JournalFormComponent } from './journal-form/journal-form.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducer } from '../Rx/plants.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PlantEffects } from '../Rx/plants.effects';
import { metaReducers, ROOT_REDUCERS } from '../Rx/rx.index';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { MultiplierPipe } from 'src/CustomPipes/multiplier.pipe';
import { DateConversionPipe } from 'src/CustomPipes/dateConversion.pipe';
import { DateFormatPipe } from '../CustomPipes/dateFormat.pipe';
@NgModule({
  declarations: [
    AppComponent,
    ForestComponent,
    HomeComponent,
    PlantGrowthComponent,
    PlantUploadComponent,
    PlantNewComponent,
    CareFormComponent,
    HeaderComponent,
    JournalFormComponent,
    FooterComponent,
    MultiplierPipe,
    DateConversionPipe,
    DateFormatPipe,
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
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
