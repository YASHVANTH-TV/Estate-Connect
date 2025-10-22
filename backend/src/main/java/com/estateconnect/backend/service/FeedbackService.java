package com.estateconnect.backend.service;

import java.util.List;
import java.util.Optional;

import com.estateconnect.backend.model.Feedback;

public interface FeedbackService {
    Feedback createFeedback(Feedback feedback);

    Optional<Feedback> getFeedbackById(Long feedbackId);

    List<Feedback> getAllFeedbacks();

    void deleteFeedback(Long feedbackId);

    List<Feedback> getFeedbacksByUserId(Long userId);
}