package com.estateconnect.backend.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.estateconnect.backend.model.Feedback;

import java.util.List;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, Long> {
    List<Feedback> findByUser_UserId(Long userId);
}