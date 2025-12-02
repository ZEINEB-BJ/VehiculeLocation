import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Location } from '../../models/location';
import { Vehicule, StatutVehicule } from '../../models/vehicule';
import { LocationService } from '../../services/location';
import { VehiculeService } from '../../services/vehicule';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.html',
  styleUrls: ['./location-form.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LocationFormComponent implements OnInit {
  
  locationForm!: FormGroup;
  vehiculesDisponibles: Vehicule[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private vehiculeService: VehiculeService
  ) { }
  
  ngOnInit(): void {
    this.initForm();
    this.loadVehiculesDisponibles();
  }
  
  initForm(): void {
    const today = new Date().toISOString().split('T')[0];
    
    this.locationForm = this.formBuilder.group({
      clientNom: ['', [Validators.required, Validators.minLength(2)]],
      vehiculeId: ['', Validators.required],
      dateDebut: [today, Validators.required],
      dateFin: ['', Validators.required]
    }, {
      validators: this.dateFinValidator
    });
  }
  
  dateFinValidator(formGroup: FormGroup) {
    const dateDebut = formGroup.get('dateDebut')?.value;
    const dateFin = formGroup.get('dateFin')?.value;
    
    if (dateDebut && dateFin && dateFin <= dateDebut) {
      return { dateFinInvalid: true };
    }
    return null;
  }

  loadVehiculesDisponibles(): void {
    this.vehiculeService.getVehiculesByStatut(StatutVehicule.DISPONIBLE).subscribe({
      next: (data) => {
        this.vehiculesDisponibles = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des véhicules disponibles:', error);
        this.errorMessage = 'Impossible de charger les véhicules disponibles';
      }
    });
  }

  get f() {
    return this.locationForm.controls;
  }
  
  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    
    if (this.locationForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    
    const formValues = this.locationForm.value;
    const selectedVehicule = this.vehiculesDisponibles.find(
      v => v.id === parseInt(formValues.vehiculeId)
    );
    
    if (!selectedVehicule) {
      this.errorMessage = 'Véhicule sélectionné invalide';
      this.loading = false;
      return;
    }
    
    const location: Location = {
      clientNom: formValues.clientNom,
      dateDebut: formValues.dateDebut,
      dateFin: formValues.dateFin,
      vehicule: selectedVehicule
    };
    
    
    this.locationService.createLocation(location).subscribe({
      next: (response) => {
        this.successMessage = `Location créée avec succès pour ${response.vehicule.marque} ${response.vehicule.modele}`;
        this.resetForm();
        this.loadVehiculesDisponibles();
      },
      error: (error) => {
        console.error('Erreur lors de la création de la location:', error);
        
        
        if (error.error && error.error.error) {
          this.errorMessage = error.error.error;
        } else if (error.status === 400) {
          this.errorMessage = 'Le véhicule sélectionné n\'est plus disponible';
        } else {
          this.errorMessage = 'Erreur lors de la création de la location';
        }
        
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  
  
  resetForm(): void {
    this.submitted = false;
    this.locationForm.reset();
    const today = new Date().toISOString().split('T')[0];
    this.locationForm.patchValue({ dateDebut: today });
  }
  
  calculerPrixTotal(): number {
    const formValues = this.locationForm.value;
    
    if (!formValues.dateDebut || !formValues.dateFin || !formValues.vehiculeId) {
      return 0;
    }
    
    const debut = new Date(formValues.dateDebut);
    const fin = new Date(formValues.dateFin);
    const diffTime = fin.getTime() - debut.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) {
      return 0;
    }
    
    const vehicule = this.vehiculesDisponibles.find(
      v => v.id === parseInt(formValues.vehiculeId)
    );
    
    return vehicule ? diffDays * vehicule.prixJour : 0;
  }
  
  calculerNombreJours(): number {
    const formValues = this.locationForm.value;
    
    if (!formValues.dateDebut || !formValues.dateFin) {
      return 0;
    }
    
    const debut = new Date(formValues.dateDebut);
    const fin = new Date(formValues.dateFin);
    const diffTime = fin.getTime() - debut.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  }
}