package com.estateconnect.backend.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import com.estateconnect.backend.model.Property;

@Repository
public interface PropertyRepo extends JpaRepository<Property, Long> {
    Optional<Property> findByTitleAndLocationAndPriceAndType(String title, String location, Double price, String type);
}