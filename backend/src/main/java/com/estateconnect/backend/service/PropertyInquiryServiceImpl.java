package com.estateconnect.backend.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.estateconnect.backend.exception.NoInquiriesFoundException;
import com.estateconnect.backend.model.PropertyInquiry;
import com.estateconnect.backend.repository.PropertyInquiryRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PropertyInquiryServiceImpl implements PropertyInquiryService {

    private final PropertyInquiryRepo propertyInquiryRepo;

    @Override
    public PropertyInquiry addInquiry(PropertyInquiry propertyInquiry) {
        propertyInquiry.setStatus("Pending");
        return propertyInquiryRepo.save(propertyInquiry);
    }

    @Override
    public Optional<PropertyInquiry> getInquiryById(Long inquiryId) {
        Optional<PropertyInquiry> propertyInquiry = propertyInquiryRepo.findById(inquiryId);
        if (propertyInquiry.isEmpty()) {
            throw new NoInquiriesFoundException("Sorry, no Inquiry found with ID " + inquiryId);
        } else {
            return propertyInquiry;
        }
    }

    @Override
    public List<PropertyInquiry> getAllInquires() {
        List<PropertyInquiry> propertyInquiries = propertyInquiryRepo.findAll();
        if (propertyInquiries.isEmpty()) {
            throw new NoInquiriesFoundException("Sorry, currently there are no Inquiries.");
        } else {
            return propertyInquiries;
        }
    }

    @Override
    public PropertyInquiry updateInquiry(Long inquiryId, PropertyInquiry propertyInquiry) {
        Optional<PropertyInquiry> op = propertyInquiryRepo.findById(inquiryId);
        if (op.isEmpty()) {
            throw new NoInquiriesFoundException("Sorry, Inquiry with ID " + inquiryId + " not found for Updation.");
        } else {
            PropertyInquiry p = op.get();
            p.setAdminResponse(propertyInquiry.getAdminResponse());
            p.setContactDetails(propertyInquiry.getContactDetails());
            p.setInquiryDate(propertyInquiry.getInquiryDate());
            p.setMessage(propertyInquiry.getMessage());
            p.setPriority(propertyInquiry.getPriority());
            p.setProperty(propertyInquiry.getProperty());
            p.setResponseDate(propertyInquiry.getResponseDate());
            p.setStatus(propertyInquiry.getStatus());
            p.setUser(propertyInquiry.getUser());
            return propertyInquiryRepo.save(p);
        }
    }

    @Override
    public void deleteInquiry(Long inquiryId) {
        Optional<PropertyInquiry> propertyById = propertyInquiryRepo.findById(inquiryId);
        if (propertyById.isEmpty()) {
            throw new NoInquiriesFoundException("Sorry, Inquiry with ID " + inquiryId + " not found for Deletion.");
        } else {
            propertyInquiryRepo.deleteById(inquiryId);
        }
    }

    @Override
    public List<PropertyInquiry> getInquiriesByUserId(Long userId) {
        List<PropertyInquiry> propertyInquiries = propertyInquiryRepo.findByUser_UserId(userId);
        if (propertyInquiries.isEmpty()) {
            throw new NoInquiriesFoundException("Sorry, Inquiry associated with UserId " + userId + " is not found.");
        } else {
            return propertyInquiries;
        }
    }
}
