package com.estateconnect.backend.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.estateconnect.backend.exception.NoFeedbacksFoundException;
import com.estateconnect.backend.model.Feedback;
import com.estateconnect.backend.repository.FeedbackRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepo feedbackRepo;

    @Override
    public Feedback createFeedback(Feedback feedback) {
        return feedbackRepo.save(feedback);
    }

    @Override
    public Optional<Feedback> getFeedbackById(Long feedbackId) {
        return feedbackRepo.findById(feedbackId);
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        List<Feedback> l = feedbackRepo.findAll();
        if (l.isEmpty()) {
            throw new NoFeedbacksFoundException("Sorry, no feedbacks found.");
        }
        return l;
    }

    @Override
    public void deleteFeedback(Long feedbackId) {
        Optional<Feedback> o = feedbackRepo.findById(feedbackId);
        if (o.isEmpty()) {
            throw new NoFeedbacksFoundException("Sorry, feedback with ID " + feedbackId + " not found for Deletion.");
        }
        feedbackRepo.deleteById(feedbackId);
    }

    @Override
    public List<Feedback> getFeedbacksByUserId(Long userId) {
        List<Feedback> l = feedbackRepo.findByUser_UserId(userId);
        if (l.isEmpty()) {
            throw new NoFeedbacksFoundException("User has no feedbacks.");
        }
        return l;
    }
}