import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyInquiry } from '../models/property-inquiry.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PropertyInquiryService {

  private API_URL: string = environment.apiUrl;

  constructor(private client: HttpClient) { }

  addInquiry(inquiry: PropertyInquiry): Observable<any> {
    return this.client.post(`${this.API_URL}/api/inquiries`, inquiry);
  }

  getAllInquiries(): Observable<any> {
    return this.client.get(`${this.API_URL}/api/inquiries`);
  }

  getInquiriesByUserId(userId: number): Observable<any> {
    return this.client.get(`${this.API_URL}/api/inquiries/user/${userId}`);
  }

  updateInquiry(inquiryId: number, inquiry: PropertyInquiry): Observable<any> {
    return this.client.put(`${this.API_URL}/api/inquiries/${inquiryId}`, inquiry);
  }

  deleteInquiry(inquiryId: number) {
    return this.client.delete(`${this.API_URL}/api/inquiries/${inquiryId}`);
  }
}