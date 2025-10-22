import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from 'src/app/models/property.model';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-admin-view-property',
  templateUrl: './admin-view-property.component.html',
  styleUrls: ['./admin-view-property.component.css']
})
export class AdminViewPropertyComponent implements OnInit {
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  uniqueTypes: string[] = [];

  searchTerm: string = '';
  selectedType: string = '';

  deleteTarget: Property | null = null;

  constructor(private propertyService: PropertyService, private route: Router) { }

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.propertyService.getAllProperties().subscribe({
      next: (res: Property[]) => {
        this.properties = res || [];
        this.uniqueTypes = Array.from(new Set(this.properties.map(p => p.type || ''))).filter(Boolean);
        this.applyFilters();
      },
      error: (error: HttpErrorResponse) => {
        this.properties = [];
        this.filteredProperties = [];
        console.log(error.error);
      }
    });
  }

  applyFilters(): void {
    this.filteredProperties = this.properties.filter(p => {
      const matchesTitle = p.title?.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = !this.selectedType || p.type === this.selectedType;
      return matchesTitle && matchesType;
    });
  }

  editProperty(propertyId: number): void {
    this.route.navigate(['/admin-edit-property', propertyId]);
  }

  openDeleteModal(property: Property): void {
    this.deleteTarget = property;
  }

  closeDeleteModal(): void {
    this.deleteTarget = null;
  }

  confirmDelete(): void {
    if (!this.deleteTarget) return;
    this.propertyService.deleteProperty(this.deleteTarget.propertyId).subscribe({
      next: () => {
        this.properties = this.properties.filter(p => p.propertyId !== this.deleteTarget!.propertyId);
        this.applyFilters();
        this.closeDeleteModal();
        console.log("Deleted");

      },
      error: (error: HttpErrorResponse) => {
        alert('Error Deleting Property.');
        this.closeDeleteModal();
        console.log(error.error);
      }
    });
  }
}