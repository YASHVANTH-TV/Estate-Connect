package com.estateconnect.backend.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.estateconnect.backend.model.PropertyInquiry;

import java.util.List;

@Repository
public interface PropertyInquiryRepo extends JpaRepository<PropertyInquiry, Long> {
    List<PropertyInquiry> findByUser_UserId(Long userId);
}