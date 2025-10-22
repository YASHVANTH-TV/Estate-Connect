package com.estateconnect.backend.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.estateconnect.backend.exception.NoPropertiesFoundException;
import com.estateconnect.backend.model.Property;
import com.estateconnect.backend.service.PropertyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyService propertyService;

    @PostMapping
    public ResponseEntity<Property> addProperty(@RequestBody Property property) {
        Property p = propertyService.addProperty(property);
        return new ResponseEntity<>(p, HttpStatus.valueOf(201));
    }

    @GetMapping("/{propertyId}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long propertyId) {
        Optional<Property> p = propertyService.getPropertyById(propertyId);
        if (p.isPresent()) {
            return new ResponseEntity<>(p.get(), HttpStatus.valueOf(200));
        } else {
            throw new NoPropertiesFoundException("Sorry, Property with ID " + propertyId + " not Found.");
        }
    }

    @GetMapping
    public ResponseEntity<List<Property>> getAllProperties() {
        List<Property> p = propertyService.getAllProperties();
        return new ResponseEntity<>(p, HttpStatus.valueOf(200));
    }

    @PutMapping("/{propertyId}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long propertyId, @RequestBody Property property) {
        Property p = propertyService.updateProperty(propertyId, property);
        return new ResponseEntity<>(p, HttpStatus.valueOf(200));
    }

    @DeleteMapping("/{propertyId}")
    public ResponseEntity<Property> deleteProperty(@PathVariable Long propertyId) {
        propertyService.deleteProperty(propertyId);
        return new ResponseEntity<>(HttpStatus.valueOf(200));
    }
}