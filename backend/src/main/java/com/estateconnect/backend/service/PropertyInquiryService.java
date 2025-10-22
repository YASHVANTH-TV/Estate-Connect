package com.estateconnect.backend.service;

import java.util.List;
import java.util.Optional;

import com.estateconnect.backend.model.PropertyInquiry;

public interface PropertyInquiryService {
    PropertyInquiry addInquiry(PropertyInquiry propertyInquiry);

    Optional<PropertyInquiry> getInquiryById(Long inquiryId);

    List<PropertyInquiry> getAllInquires();

    PropertyInquiry updateInquiry(Long inquiryId, PropertyInquiry propertyInquiry);

    void deleteInquiry(Long inquiryId);

    List<PropertyInquiry> getInquiriesByUserId(Long userId);
}