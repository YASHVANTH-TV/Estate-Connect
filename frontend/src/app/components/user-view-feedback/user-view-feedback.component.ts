import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../models/feedback.model';
import { FeedbackService } from '../../services/feedback.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-view-feedback',
  templateUrl: './user-view-feedback.component.html',
  styleUrls: ['./user-view-feedback.component.css']
})
export class UserViewFeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  userId: number = 0;
  isLoading = true;
  error: string = "";

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.userId = +localStorage.getItem("userId")
    this.getUserFeedbacks();
  }

  getUserFeedbacks() {
    this.isLoading = true;
    this.feedbackService.getAllFeedbacksByUserId(this.userId).subscribe((result) => {
      console.log(result);
      this.feedbacks = result;
      this.isLoading = false;
    }, (error: HttpErrorResponse) => {
      console.log(error.error);
    })
  }
}