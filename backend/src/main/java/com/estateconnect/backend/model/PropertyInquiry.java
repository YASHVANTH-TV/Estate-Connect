package com.estateconnect.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

import java.time.LocalDate;

@Entity
@Table(name = "property_inquiries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PropertyInquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inquiryId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "propertyId", nullable = false)
    private Property property;

    private String message;
    private String priority;
    private String status;
    private LocalDate inquiryDate;
    private LocalDate responseDate;
    private String adminResponse;
    private String contactDetails;
}