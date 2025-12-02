import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Vehicule, StatutVehicule } from '../../models/vehicule';
import { VehiculeService } from '../../services/vehicule';

@Component({
  selector: 'app-vehicule-form',
  templateUrl: './vehicule-form.html',
  styleUrls: ['./vehicule-form.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class VehiculeFormComponent implements OnInit {
  
  vehiculeForm!: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  submitted = false;
  
  
  statutOptions = Object.values(StatutVehicule);
  
  constructor(
    private formBuilder: FormBuilder,
    private vehiculeService: VehiculeService
  ) { }
  
  ngOnInit(): void {
    this.initForm();
  }
  
  initForm(): void {
    this.vehiculeForm = this.formBuilder.group({
      marque: ['', [Validators.required, Validators.minLength(2)]],
      modele: ['', [Validators.required, Validators.minLength(1)]],
      prixJour: ['', [Validators.required, Validators.min(1)]],
      statut: [StatutVehicule.DISPONIBLE, Validators.required]
    });
  }
  
  get f(): any {
    return this.vehiculeForm.controls as any;
  }
  
  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    
    if (this.vehiculeForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    
    const vehicule: Vehicule = {
      marque: this.vehiculeForm.value.marque,
      modele: this.vehiculeForm.value.modele,
      prixJour: parseFloat(this.vehiculeForm.value.prixJour),
      statut: this.vehiculeForm.value.statut
    };
    
    this.vehiculeService.createVehicule(vehicule).subscribe({
      next: (response) => {
        this.successMessage = `Véhicule ${response.marque} ${response.modele} créé avec succès (ID: ${response.id})`;
        this.resetForm();
      },
      error: (error) => {
        console.error('Erreur lors de la création du véhicule:', error);
        this.errorMessage = 'Erreur lors de la création du véhicule. Veuillez réessayer.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  
  resetForm(): void {
    this.submitted = false;
    this.vehiculeForm.reset({
      statut: StatutVehicule.DISPONIBLE
    });
  }
}