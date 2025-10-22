import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from 'src/app/models/property.model';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-user-view-properties',
  templateUrl: './user-view-properties.component.html',
  styleUrls: ['./user-view-properties.component.css']
})
export class UserViewPropertiesComponent implements OnInit {
  properties: Property[] = [];
  filteredProperties: Property[] = [];

  searchTitle = '';
  searchLocation = '';
  selectedType = '';
  selectedSubType = '';
  selectedTechType = '';
  selectedVaastu = '';
  selectedRise = '';
  selectedFloorRange = '';
  searchBuilder = '';

  showTechType = false;
  showFloorRange = false;
  showRiseType = false;

  floorRangeOptions: { label: string, value: string }[] = [];

  constructor(private propertyService: PropertyService, private router: Router) { }

  ngOnInit(): void {
    this.propertyService.getAllProperties().subscribe((result) => {
      this.properties = result;
      this.filteredProperties = result;
    }, (error: HttpErrorResponse) => {
      console.log(error.error);
    });
  }

  onTypeChange(): void {
    this.selectedSubType = '';
    this.selectedTechType = '';
    this.selectedRise = '';
    this.selectedFloorRange = '';
    this.showTechType = this.selectedType !== '';
    this.showRiseType = false;
    this.showFloorRange = false;
    this.floorRangeOptions = [];

    if (this.selectedType === 'Commercial') {
      this.showTechType = true;
    }
    if (this.selectedType === 'Residential') {
      this.showTechType = false;
    }

    this.applyFilters();
  }

  onSubTypeChange(): void {
    this.selectedTechType = '';
    this.selectedRise = '';
    this.selectedFloorRange = '';
    this.showTechType = this.selectedSubType === 'Flat';
    this.showRiseType = false;
    this.showFloorRange = false;
    this.floorRangeOptions = [];

    if (this.selectedSubType === 'Villa') {
      this.setFloorRangeOptions([{ label: '1-4', value: '1-4' }]);
    }

    this.applyFilters();
  }

  onTechTypeChange(): void {
    this.selectedRise = '';
    this.selectedFloorRange = '';
    this.showFloorRange = true;

    if (this.selectedType === 'Commercial') {
      if (this.selectedTechType === 'Brick') {
        this.setFloorRangeOptions([
          { label: '1-4', value: '1-4' }
        ]);
        this.showRiseType = false;
      } else if (this.selectedTechType === 'Mivan') {
        this.showRiseType = true;
      }
    } else if (this.selectedType === 'Residential') {
      if (this.selectedSubType === 'Flat') {
        if (this.selectedTechType === 'Brick') {
          this.setFloorRangeOptions([{ label: '1-4', value: '1-4' }]);
          this.showRiseType = false;
        } else if (this.selectedTechType === 'Mivan') {
          this.showRiseType = true;
        }
      }
    }

    this.applyFilters();
  }

  onRiseTypeChange(): void {
    this.selectedFloorRange = '';
    this.floorRangeOptions = [];

    if (this.selectedRise === 'High-rise') {
      this.setFloorRangeOptions([
        { label: '1-5', value: '1-5' },
        { label: '6-10', value: '6-10' },
        { label: '11-15', value: '11-15' },
        { label: '15+', value: '15+' }
      ]);
    } else if (this.selectedRise === 'Low-rise') {
      this.setFloorRangeOptions([{ label: '1-4', value: '1-4' }]);
    }

    this.applyFilters();
  }

  setFloorRangeOptions(options: { label: string, value: string }[]): void {
    this.floorRangeOptions = options;
    this.showFloorRange = true;
  }

  applyFilters(): void {
    this.filteredProperties = this.properties.filter(p => {
      const matchesTitle = !this.searchTitle || p.title.toLowerCase().includes(this.searchTitle.toLowerCase());
      const matchesLocation = !this.searchLocation || p.location.toLowerCase().includes(this.searchLocation.toLowerCase());
      const matchesType = !this.selectedType || p.type === this.selectedType;
      const matchesVaastu = !this.selectedVaastu || p.vaastu === this.selectedVaastu;
      const matchesRise = !this.selectedRise || p.riseType === this.selectedRise;
      const matchesBuilder = !this.searchBuilder || (p.builder && p.builder.toLowerCase().includes(this.searchBuilder.toLowerCase()));
      const matchesTechType = !this.selectedTechType || p.techType === this.selectedTechType;

      let matchesFloorRange = true;
      if (this.selectedFloorRange && p.floor !== undefined && !isNaN(Number(p.floor))) {
        const floor = Number(p.floor);
        switch (this.selectedFloorRange) {
          case '0-4': matchesFloorRange = floor >= 0 && floor <= 4; break;
          case '1-4': matchesFloorRange = floor >= 1 && floor <= 4; break;
          case '0-5': matchesFloorRange = floor >= 0 && floor <= 5; break;
          case '1-5': matchesFloorRange = floor >= 1 && floor <= 5; break;
          case '6-10': matchesFloorRange = floor >= 6 && floor <= 10; break;
          case '11-15': matchesFloorRange = floor >= 11 && floor <= 15; break;
          case '15+': matchesFloorRange = floor >= 15; break;
        }
      }

      return matchesTitle && matchesLocation && matchesType && matchesVaastu &&
        matchesRise && matchesFloorRange && matchesBuilder && matchesTechType;
    });
  }

  navigateToAddInquiry(propertyId: number): void {
    this.router.navigate(['/user-add-inquiry', propertyId]);
  }
}