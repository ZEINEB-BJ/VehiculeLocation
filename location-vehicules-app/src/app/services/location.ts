import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  
  private apiUrl = 'http://localhost:8081/api/locations';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  constructor(private http: HttpClient) { }
  
  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl);
  }
  
  getLocationById(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.apiUrl}/${id}`);
  }
  
  createLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.apiUrl, location, this.httpOptions);
  }
  
  getLocationsByVehicule(vehiculeId: number): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.apiUrl}/vehicule/${vehiculeId}`);
  }
  
  getLocationsByClient(clientNom: string): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.apiUrl}/client/${clientNom}`);
  }
  
  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}