export enum StatutVehicule {
  DISPONIBLE = 'DISPONIBLE',
  LOUE = 'LOUE',
  MAINTENANCE = 'MAINTENANCE'
}

export interface Vehicule {
  id?: number;
  marque: string;
  modele: string;
  prixJour: number;
  statut: StatutVehicule;
}