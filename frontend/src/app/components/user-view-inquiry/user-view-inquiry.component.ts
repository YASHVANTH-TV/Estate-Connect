import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { PropertyInquiry } from 'src/app/models/property-inquiry.model';
import { PropertyInquiryService } from 'src/app/services/property-inquiry.service';

@Component({
  selector: 'app-user-view-inquiry',
  templateUrl: './user-view-inquiry.component.html',
  styleUrls: ['./user-view-inquiry.component.css']
})
export class UserViewInquiryComponent implements OnInit {

  userId: number;
  inquiries: PropertyInquiry[] = [];
  errorMessage: string = '';

  constructor(private inquiryService: PropertyInquiryService) { }

  ngOnInit(): void {
    const userIdStr = localStorage.getItem("userId");
    if (userIdStr) {
      this.userId = +userIdStr;
      this.loadInquiries();
    } else {
      this.errorMessage = 'User ID not found in local storage.';
      console.warn(this.errorMessage);
    }
  }

  loadInquiries(): void {
    this.inquiryService.getInquiriesByUserId(this.userId).subscribe({
      next: (result: PropertyInquiry[]) => {
        this.inquiries = result;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load inquiries:', error);
        this.errorMessage = 'Failed to load inquiries. Please try again later.';
      }
    });
  }
}