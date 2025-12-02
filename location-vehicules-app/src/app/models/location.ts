import { Vehicule } from './vehicule';

export interface Location {
  id?: number;
  dateDebut: string;  // Format: 'yyyy-MM-dd'
  dateFin: string;    // Format: 'yyyy-MM-dd'
  clientNom: string;
  vehicule: Vehicule;
}