import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Property } from 'src/app/models/property.model';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-admin-add-property',
  templateUrl: './admin-add-property.component.html',
  styleUrls: ['./admin-add-property.component.css']
})
export class AdminAddPropertyComponent implements OnInit {

  successMessage: string = '';
  errorMessage: string = '';

  property: Property = {
    title: '',
    description: '',
    location: '',
    price: null,
    type: '',
    status: '',
    vaastu: '',
    riseType: '',
    floor: null,
    builder: '',
    techType: '',
    subType: ''
  };

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void { }

  onSubmit(propertyForm: NgForm) {
    if (propertyForm.invalid || !this.isFloorValid()) {
      this.errorMessage = 'Cannot add Property. Enter valid details.';
      this.successMessage = '';
      return;
    }

    this.propertyService.addProperty(this.property).subscribe({
      next: () => {
        this.successMessage = 'Property added successfully.';
        this.errorMessage = '';
        console.log("Added Property: ", this.property);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Failed to add property.';
        this.successMessage = '';
        console.log(error.error);
      }
    });
  }

  onClose() {
    this.successMessage = '';
    this.errorMessage = '';
    this.property = {
      title: '',
      description: '',
      location: '',
      price: null,
      type: '',
      status: '',
      vaastu: '',
      riseType: '',
      floor: null,
      builder: '',
      techType: '',
      subType: ''
    };
  }

  shouldShowFloor(): boolean {
    const { type, subType, techType } = this.property;
    return (
      (type === 'Residential' && subType === 'Villa') ||
      (type === 'Residential' && subType === 'Flat' && !!techType) ||
      (type === 'Commercial' && !!techType)
    );
  }

  getMaxFloor(): number {
    const { type, subType, techType, riseType } = this.property;

    if (type === 'Residential') {
      if (subType === 'Villa') return 3;
      if (subType === 'Flat') {
        if (techType === 'Brick') return 4;
        if (techType === 'Mivan') return riseType === 'High-rise' ? 50 : 4;
      }
    }

    if (type === 'Commercial') {
      if (techType === 'Brick') return 3;
      if (techType === 'Mivan') return riseType === 'High-rise' ? 50 : 4;
    }

    return 100;
  }

  isFloorValid(): boolean {
    if (!this.shouldShowFloor()) return true;
    const maxFloor = this.getMaxFloor();
    return this.property.floor !== null && this.property.floor <= maxFloor;
  }
}