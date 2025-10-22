import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyInquiry } from 'src/app/models/property-inquiry.model';
import { PropertyInquiryService } from 'src/app/services/property-inquiry.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-user-add-inquiry',
  templateUrl: './user-add-inquiry.component.html',
  styleUrls: ['./user-add-inquiry.component.css']
})
export class UserAddInquiryComponent implements OnInit {

  successMessage: string = '';
  errorMessage: string = '';

  propertyId: number;
  userId: number;
  inquiry: PropertyInquiry = {
    user: {
      userId: null,
      mobileNumber: ''
    },
    property: {
      title: ''
    },
    message: '',
    priority: '',
    inquiryDate: new Date().toISOString()
  };

  constructor(
    private propertyInquiryService: PropertyInquiryService,
    private activatedRoute: ActivatedRoute,
    private propertyService: PropertyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.propertyId = +this.activatedRoute.snapshot.params['propertyId'];
    this.propertyService.getPropertyById(this.propertyId).subscribe({
      next: (result) => {
        this.inquiry.property = result;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Failed to fetch property details.';
        console.error(error);
      }
    });
    this.userId = +localStorage.getItem('userId');
    this.inquiry.user.userId = this.userId;
  }

  onSubmit(inquiryForm: NgForm) {
    if (inquiryForm.invalid) {
      this.errorMessage = 'Please fill all the required fields properly.';
      this.successMessage = '';
      return;
    }

    this.propertyInquiryService.addInquiry(this.inquiry).subscribe({
      next: (result) => {
        this.successMessage = 'Inquiry submitted successfully.';
        this.errorMessage = '';
        console.log(result);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Failed to submit inquiry.';
        this.successMessage = '';
        console.error(error);
      }
    });
  }

  closePopup() {
    this.successMessage = '';
    this.errorMessage = '';
    this.router.navigate(['/user-view-inquiries']);
  }
}