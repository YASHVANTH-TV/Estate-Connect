import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-admin-view-feedback',
  templateUrl: './admin-view-feedback.component.html',
  styleUrls: ['./admin-view-feedback.component.scss']
})
export class AdminViewFeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  filteredFeedbacks: Feedback[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  profileModalOpen: boolean = false;
  propertyModalOpen: boolean = false;
  selectedFeedback: Feedback | null = null;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe((data: Feedback[]) => {
      this.feedbacks = data;
      this.categories = Array.from(new Set(data.map(fb => fb.category).filter(c => c)));
      this.filteredFeedbacks = [...this.feedbacks];
    }, (error: HttpErrorResponse) => {
      console.log(error.error);
    });
  }

  filterByCategory(): void {
    if (!this.selectedCategory) {
      this.filteredFeedbacks = [...this.feedbacks];
    } else {
      this.filteredFeedbacks = this.feedbacks.filter(fb => fb.category === this.selectedCategory);
    }
  }

  showUserProfile(fb: Feedback): void {
    this.selectedFeedback = fb;
    this.profileModalOpen = true;
  }

  closeProfileModal(): void {
    this.profileModalOpen = false;
  }

  viewPropertyInfo(fb: Feedback): void {
    this.selectedFeedback = fb;
    this.propertyModalOpen = true;
  }

  closePropertyModal(): void {
    this.propertyModalOpen = false;
  }
}