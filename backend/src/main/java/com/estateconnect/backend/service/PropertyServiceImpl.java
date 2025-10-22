package com.estateconnect.backend.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.estateconnect.backend.exception.DuplicatePropertyException;
import com.estateconnect.backend.exception.NoPropertiesFoundException;
import com.estateconnect.backend.model.Property;
import com.estateconnect.backend.repository.PropertyRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepo propertyRepo;

    @Override
    public Property addProperty(Property property) {
        Optional<Property> existingProperty = propertyRepo.findByTitleAndLocationAndPriceAndType(property.getTitle(),
                property.getLocation(), property.getPrice(), property.getType());
        if (existingProperty.isPresent()) {
            throw new DuplicatePropertyException("This Property Already Exists.");
        } else {
            return propertyRepo.save(property);
        }
    }

    @Override
    public Optional<Property> getPropertyById(Long propertyId) {
        return propertyRepo.findById(propertyId);
    }

    @Override
    public List<Property> getAllProperties() {
        List<Property> listOfProperties = propertyRepo.findAll();
        if (listOfProperties.isEmpty()) {
            throw new NoPropertiesFoundException("Sorry, No Properties Found.");
        } else {
            return listOfProperties;
        }
    }

    @Override
    public Property updateProperty(Long propertyId, Property property) {
        Optional<Property> propertyAvailable = propertyRepo.findById(propertyId);
        if (propertyAvailable.isEmpty()) {
            throw new NoPropertiesFoundException("Sorry, Property with ID " + propertyId + " not found for Updation.");
        } else {
            Property existingProperty = propertyAvailable.get();
            existingProperty.setTitle(property.getTitle());
            existingProperty.setDescription(property.getDescription());
            existingProperty.setLocation(property.getLocation());
            existingProperty.setPrice(property.getPrice());
            existingProperty.setType(property.getType());
            existingProperty.setStatus(property.getStatus());
            existingProperty.setBuilder(property.getBuilder());
            existingProperty.setFloor(property.getFloor());
            existingProperty.setRiseType(property.getRiseType());
            existingProperty.setVaastu(property.getVaastu());
            return propertyRepo.save(existingProperty);
        }
    }

    @Override
    public void deleteProperty(Long propertyId) {
        Optional<Property> propertyById = propertyRepo.findById(propertyId);
        if (propertyById.isEmpty()) {
            throw new NoPropertiesFoundException("Sorry, Property with ID " + propertyId + " not found for Deletion.");
        } else {
            propertyRepo.deleteById(propertyId);
        }
    }
}