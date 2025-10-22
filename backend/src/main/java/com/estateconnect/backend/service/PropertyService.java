package com.estateconnect.backend.service;

import java.util.List;
import java.util.Optional;

import com.estateconnect.backend.model.Property;

public interface PropertyService {
    Property addProperty(Property property);

    Optional<Property> getPropertyById(Long propertyId);

    List<Property> getAllProperties();

    Property updateProperty(Long propertyId, Property property);

    void deleteProperty(Long propertyId);
}