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
import com.estateconnect.backend.model.PropertyInquiry;
import com.estateconnect.backend.service.PropertyInquiryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
public class PropertyInquiryController {

    private final PropertyInquiryService propertyInquiryService;

    @PostMapping
    public ResponseEntity<PropertyInquiry> addInquiry(@RequestBody PropertyInquiry propertyInquiry) {
        PropertyInquiry inquiry = propertyInquiryService.addInquiry(propertyInquiry);
        return new ResponseEntity<>(inquiry, HttpStatus.valueOf(201));
    }

    @GetMapping("/{inquiryId}")
    public ResponseEntity<PropertyInquiry> getInquiryById(@PathVariable Long inquiryId) {
        Optional<PropertyInquiry> inquiry = propertyInquiryService.getInquiryById(inquiryId);
        return new ResponseEntity<>(inquiry.get(), HttpStatus.valueOf(200));
    }

    @GetMapping
    public ResponseEntity<List<PropertyInquiry>> getAllInquires() {
        List<PropertyInquiry> inquiries = propertyInquiryService.getAllInquires();
        return new ResponseEntity<>(inquiries, HttpStatus.valueOf(200));
    }

    @PutMapping("/{inquiryId}")
    public ResponseEntity<PropertyInquiry> updateInquiry(@PathVariable Long inquiryId,
            @RequestBody PropertyInquiry inquiry) {
        PropertyInquiry updatedInquiry = propertyInquiryService.updateInquiry(inquiryId, inquiry);
        return new ResponseEntity<>(updatedInquiry, HttpStatus.valueOf(200));
    }

    @DeleteMapping("/{inquiryId}")
    public ResponseEntity<Void> deleteInquiry(@PathVariable Long inquiryId) {
        propertyInquiryService.deleteInquiry(inquiryId);
        return new ResponseEntity<>(HttpStatus.valueOf(200));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PropertyInquiry>> getInquiriesByUserId(@PathVariable Long userId) {
        List<PropertyInquiry> inquiries = propertyInquiryService.getInquiriesByUserId(userId);
        return new ResponseEntity<>(inquiries, HttpStatus.valueOf(200));
    }
}