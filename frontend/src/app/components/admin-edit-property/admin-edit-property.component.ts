import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/models/property.model';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-admin-edit-property',
  templateUrl: './admin-edit-property.component.html',
  styleUrls: ['./admin-edit-property.component.css']
})
export class AdminEditPropertyComponent implements OnInit {

  constructor(private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('propertyId'));

    if (id) {
      this.propertyService.getPropertyById(id).subscribe({
        next: (prop: Property) => this.property = { ...prop },
        error: () => this.property = null
      });
    }
  }

  property: Property | null;
  successMessage: string = '';

  onSubmit(): void {
    if (!this.property) return;
    const propertyId = (this.property as any).propertyId || (this.property as any).id;
    this.propertyService.updateProperty(propertyId, this.property).subscribe({
      next: () => {
        this.successMessage = 'Property Updated Successfully!';
      },
      error: (error: HttpErrorResponse) => {
        this.successMessage = 'Failed to update property. Please try again.';
        console.log(error.error);
      }
    });
  }

  closePopup(): void {
    this.successMessage = '';
    this.router.navigate(['/admin-view-properties']);
  }
}
