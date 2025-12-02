import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule, StatutVehicule } from '../models/vehicule';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  
  private apiUrl = 'http://localhost:8081/api/vehicules';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  constructor(private http: HttpClient) { }
  
  getAllVehicules(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(this.apiUrl);
  }
  
  getVehiculeById(id: number): Observable<Vehicule> {
    return this.http.get<Vehicule>(`${this.apiUrl}/${id}`);
  }
  
  createVehicule(vehicule: Vehicule): Observable<Vehicule> {
    return this.http.post<Vehicule>(this.apiUrl, vehicule, this.httpOptions);
  }
  
  updateVehicule(id: number, vehicule: Vehicule): Observable<Vehicule> {
    return this.http.put<Vehicule>(`${this.apiUrl}/${id}`, vehicule, this.httpOptions);
  }

  updateStatut(id: number, statut: StatutVehicule): Observable<Vehicule> {
    return this.http.put<Vehicule>(
      `${this.apiUrl}/${id}/statut`, 
      { statut: statut },
      this.httpOptions
    );
  }
  
  deleteVehicule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  getVehiculesByStatut(statut: StatutVehicule): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(`${this.apiUrl}/statut/${statut}`);
  }
}