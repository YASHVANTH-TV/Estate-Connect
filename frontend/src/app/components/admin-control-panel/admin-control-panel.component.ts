import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { PropertyInquiry } from 'src/app/models/property-inquiry.model';
import { Property } from 'src/app/models/property.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { PropertyInquiryService } from 'src/app/services/property-inquiry.service';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-admin-control-panel',
  templateUrl: './admin-control-panel.component.html',
  styleUrls: ['./admin-control-panel.component.css']
})
export class AdminControlPanelComponent implements OnInit {

  feedbacks: Feedback[] = [];
  inquiries: PropertyInquiry[] = [];
  properties: Property[] = [];

  feedbackCount: number = 0;
  inquiryCount: number = 0;
  propertyCount: number = 0;
  unresolvedCount: number = 0;
  highPriorityCount: number = 0;

  constructor(private fservice: FeedbackService, private piservice: PropertyInquiryService, private pservice: PropertyService) { }

  ngOnInit(): void {
    this.fservice.getFeedbacks().subscribe((result) => {
      this.feedbacks = result;
      this.feedbackCount = result.length;
    }, (error: HttpErrorResponse) => {
      console.log(error.error);
    })

    this.piservice.getAllInquiries().subscribe((result) => {
      this.inquiries = result;
      this.inquiryCount = result.length;

      this.unresolvedCount = result.filter(i => i.status === 'Pending').length;
      this.highPriorityCount = result.filter(i => i.priority === 'High').length;
    })

    this.pservice.getAllProperties().subscribe((result) => {
      this.properties = result;
      this.propertyCount = result.length;
    }, (error) => {
      console.log(error.error);
    })
  }
}