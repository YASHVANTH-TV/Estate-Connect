import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private API_URL: string = environment.apiUrl;

  constructor(private client: HttpClient) { }

  sendFeedback(feedback: Feedback): Observable<any> {
    return this.client.post(`${this.API_URL}/feedback`, feedback);
  }

  getAllFeedbacksByUserId(userId: number): Observable<any> {
    return this.client.get(`${this.API_URL}/feedback/user/${userId}`);
  }

  deleteFeedback(feedbackId: number): Observable<any> {
    return this.client.delete(`${this.API_URL}/feedback/${feedbackId}`);
  }

  getFeedbacks(): Observable<any> {
    return this.client.get(`${this.API_URL}/feedback`);
  }
}