import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { App } from './app';
import { VehiculeListComponent } from './components/vehicule-list/vehicule-list';
import { LocationFormComponent } from './components/location-form/location-form';
import { VehiculeFormComponent } from './components/vehicule-form/vehicule-form';

import { VehiculeService } from './services/vehicule';
import { LocationService } from './services/location';


const routes: Routes = [
  { path: '', redirectTo: '/vehicules', pathMatch: 'full' },
  { path: 'vehicules', component: VehiculeListComponent },
  { path: 'location/new', component: LocationFormComponent },
  { path: 'vehicule/new', component: VehiculeFormComponent }
];

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    App,
    VehiculeListComponent,
    LocationFormComponent,
    VehiculeFormComponent
  ],
  providers: [
    VehiculeService,
    LocationService
  ],
  
})
export class AppModule { }