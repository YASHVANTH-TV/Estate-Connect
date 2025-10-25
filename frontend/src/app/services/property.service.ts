import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../models/property.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private API_URL: string = environment.apiUrl;

  constructor(private client: HttpClient) { }

  getAllProperties(): Observable<any> {
    return this.client.get(`${this.API_URL}/properties`);
  }

  getPropertyById(propertyId: number): Observable<any> {
    return this.client.get(`${this.API_URL}/properties/${propertyId}`);
  }

  addProperty(property: Property): Observable<any> {
    return this.client.post(`${this.API_URL}/properties`, property);
  }

  updateProperty(propertyId: number, property: Property): Observable<any> {
    return this.client.put(`${this.API_URL}/properties/${propertyId}`, property);
  }

  deleteProperty(propertyId: number): Observable<any> {
    return this.client.delete(`${this.API_URL}/properties/${propertyId}`);
  }
}