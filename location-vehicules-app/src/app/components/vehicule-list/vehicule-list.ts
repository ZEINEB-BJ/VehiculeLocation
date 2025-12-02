import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Vehicule, StatutVehicule } from '../../models/vehicule';
import { VehiculeService } from '../../services/vehicule';

@Component({
  selector: 'app-vehicule-list',
  templateUrl: './vehicule-list.html',
  styleUrls: ['./vehicule-list.css']
  ,
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class VehiculeListComponent implements OnInit {
  
  vehicules: Vehicule[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';
  
  
  StatutVehicule = StatutVehicule;
  constructor(
    @Inject(VehiculeService) private vehiculeService: VehiculeService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.loadVehicules();
  }
  
  loadVehicules(): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.vehiculeService.getAllVehicules().subscribe({
      next: (data: Vehicule[]) => {
        this.vehicules = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des véhicules:', error);
        this.errorMessage = 'Impossible de charger les véhicules';
        this.loading = false;
      }
    });
  }
  
  
  canLouer(vehicule: Vehicule): boolean {
    return vehicule.statut === StatutVehicule.DISPONIBLE;
  }
  
 
  canRestituer(vehicule: Vehicule): boolean {
    return vehicule.statut === StatutVehicule.LOUE;
  }
  
  
  louerVehicule(vehicule: Vehicule): void {
    this.successMessage = `Redirection vers le formulaire de location pour ${vehicule.marque} ${vehicule.modele}`;
    this.router.navigate(['/location/new'], { queryParams: { vehiculeId: vehicule.id } });
  }
  
  restituerVehicule(vehicule: Vehicule): void {
    if (!vehicule.id) return;
    
    if (!confirm(`Confirmer la restitution de ${vehicule.marque} ${vehicule.modele} ?`)) {
      return;
    }
    
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    this.vehiculeService.updateStatut(vehicule.id, StatutVehicule.DISPONIBLE).subscribe({
      next: (updatedVehicule: Vehicule) => {
        this.successMessage = `${updatedVehicule.marque} ${updatedVehicule.modele} a été restitué avec succès`;
        this.loadVehicules();
      },
      error: (error: any) => {
        console.error('Erreur lors de la restitution:', error);
        this.errorMessage = 'Erreur lors de la restitution du véhicule';
        this.loading = false;
      }
    });
  }
  
  mettreEnMaintenance(vehicule: Vehicule): void {
    if (!vehicule.id) return;
    
    if (!confirm(`Mettre ${vehicule.marque} ${vehicule.modele} en maintenance ?`)) {
      return;
    }
    
    this.loading = true;
    
    this.vehiculeService.updateStatut(vehicule.id, StatutVehicule.MAINTENANCE).subscribe({
      next: () => {
        this.successMessage = 'Véhicule mis en maintenance';
        this.loadVehicules();
      },
      error: (error: any) => {
        console.error('Erreur:', error);
        this.errorMessage = 'Erreur lors de la mise en maintenance';
        this.loading = false;
      }
    });
  }

  deleteVehicule(vehicule: Vehicule): void {
    if (!vehicule.id) return;
    
    if (!confirm(`Supprimer définitivement ${vehicule.marque} ${vehicule.modele} ?`)) {
      return;
    }
    
    this.vehiculeService.deleteVehicule(vehicule.id).subscribe({
      next: () => {
        this.successMessage = 'Véhicule supprimé avec succès';
        this.loadVehicules();
      },
      error: (error: any) => {
        console.error('Erreur lors de la suppression:', error);
        this.errorMessage = 'Impossible de supprimer le véhicule';
      }
    });
  }
  
  getStatutClass(statut: StatutVehicule): string {
    switch (statut) {
      case StatutVehicule.DISPONIBLE:
        return 'badge-success';
      case StatutVehicule.LOUE:
        return 'badge-warning';
      case StatutVehicule.MAINTENANCE:
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  }
}