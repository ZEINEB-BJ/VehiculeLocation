import { Routes } from '@angular/router';
import { VehiculeListComponent } from './components/vehicule-list/vehicule-list';
import { LocationFormComponent } from './components/location-form/location-form';
import { VehiculeFormComponent } from './components/vehicule-form/vehicule-form';

export const routes: Routes = [
	{ path: '', redirectTo: '/vehicules', pathMatch: 'full' },
	{ path: 'vehicules', component: VehiculeListComponent },
	{ path: 'location/new', component: LocationFormComponent },
	{ path: 'vehicule/new', component: VehiculeFormComponent }
];
