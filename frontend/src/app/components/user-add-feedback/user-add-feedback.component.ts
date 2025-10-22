import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { PropertyService } from '../../services/property.service';
import { Feedback } from '../../models/feedback.model';
import { Property } from '../../models/property.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-add-feedback',
  templateUrl: './user-add-feedback.component.html',
  styleUrls: ['./user-add-feedback.component.css']
})
export class UserAddFeedbackComponent implements OnInit {
  properties: Property[] = [];
  feedback: Feedback = {
    feedbackText: '',
    date: '',
    user: { userId: 0 },
    property: { propertyId: 0 },
    category: ''
  };
  isSubmitted: boolean = false;
  feedbackCategories: string[] = ['Property', 'Service', 'Other'];
  errorMessage: string = '';

  constructor(private feedbackService: FeedbackService, private propertyService: PropertyService, private router: Router) { }

  ngOnInit(): void {
    this.propertyService.getAllProperties().subscribe(
      (data) => {
        this.properties = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load properties';
      })
    this.feedback.date = new Date().toISOString().substring(0, 10);
    this.feedback.user.userId = +localStorage.getItem("userId")
  }

  onSubmit(feedbackForm: NgForm) {
    if (feedbackForm.invalid) {
      this.errorMessage = 'Please fill all the required fields';
      this.isSubmitted = false;
      return;
    }
    this.errorMessage = '';
    console.log(this.feedback)

    this.feedbackService.sendFeedback(this.feedback).subscribe({
      next: (res) => {
        this.isSubmitted = true;
        feedbackForm.resetForm();
        this.feedback.date = new Date().toISOString().substring(0, 10);
        this.router.navigate(['/user-view-feedback'])
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitted = false;
        this.errorMessage = 'Error submitting feedback. Try again later.';
        console.log(error.error);
      }
    });
  }
}