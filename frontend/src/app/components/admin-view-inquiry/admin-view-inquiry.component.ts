import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { PropertyInquiry } from 'src/app/models/property-inquiry.model';
import { PropertyInquiryService } from 'src/app/services/property-inquiry.service';

@Component({
  selector: 'app-admin-view-inquiry',
  templateUrl: './admin-view-inquiry.component.html',
  styleUrls: ['./admin-view-inquiry.component.css']
})
export class AdminViewInquiryComponent implements OnInit {

  inquiries: PropertyInquiry[] = [];
  filteredInquiries: PropertyInquiry[] = [];

  searchText: string = '';
  priorityFilter: string = '';
  statusFilter: string = '';
  statusList: string[] = ['Pending', 'Resolved', 'Closed'];

  inquiryToDelete: PropertyInquiry | null = null;
  showDeleteModal: boolean = false;

  inquiryToRespond: PropertyInquiry | null = null;
  showResponseModal: boolean = false;
  responseText: string = '';

  constructor(private inquiryService: PropertyInquiryService) { }

  ngOnInit(): void {
    this.fetchInquiries();
  }

  fetchInquiries(): void {
    this.inquiryService.getAllInquiries().subscribe({
      next: (data: PropertyInquiry[]) => {
        this.inquiries = data || [];
        this.filteredInquiries = [...this.inquiries];
      },
      error: (error: HttpErrorResponse) => {
        this.inquiries = [];
        this.filteredInquiries = [];
        console.log(error.error);
      }
    });
  }

  filterInquiries(): void {
    this.filteredInquiries = this.inquiries.filter(inq => {
      const propertyName = inq.property?.title?.toLowerCase() || '';
      const matchesSearch = !this.searchText || propertyName.includes(this.searchText.toLowerCase());
      const matchesPriority = !this.priorityFilter || inq.priority === this.priorityFilter;
      const matchesStatus = !this.statusFilter || inq.status === this.statusFilter;
      return matchesSearch && matchesPriority && matchesStatus;
    });
  }

  updateStatus(inquiry: PropertyInquiry): void {
    const updated = { ...inquiry, status: inquiry.status };
    this.inquiryService.updateInquiry(inquiry.inquiryId!, updated).subscribe({
      next: () => this.fetchInquiries(),
      error: (error: HttpErrorResponse) => console.log(error.error)
    });
  }

  confirmDelete(inquiry: PropertyInquiry): void {
    this.inquiryToDelete = inquiry;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.inquiryToDelete = null;
    this.showDeleteModal = false;
  }

  deleteInquiry(): void {
    if (!this.inquiryToDelete) return;
    this.inquiryService.deleteInquiry(this.inquiryToDelete.inquiryId).subscribe({
      next: () => {
        this.inquiries = this.inquiries.filter(i => i.inquiryId !== this.inquiryToDelete!.inquiryId);
        this.fetchInquiries();
        this.closeDeleteModal();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
        this.closeDeleteModal();
      }
    });
  }

  openResponseModal(inquiry: PropertyInquiry): void {
    this.inquiryToRespond = inquiry;
    this.responseText = '';
    this.showResponseModal = true;
  }

  closeResponseModal(): void {
    this.inquiryToRespond = null;
    this.responseText = '';
    this.showResponseModal = false;
  }

  sendResponse(): void {
    if (!this.inquiryToRespond || !this.responseText.trim()) return;

    const updated: PropertyInquiry = {
      ...this.inquiryToRespond,
      adminResponse: this.responseText,
      responseDate: new Date().toISOString()
    };

    this.inquiryService.updateInquiry(this.inquiryToRespond.inquiryId!, updated).subscribe({
      next: () => {
        this.fetchInquiries();
        this.closeResponseModal();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
        this.closeResponseModal();
      }
    });
  }
}
