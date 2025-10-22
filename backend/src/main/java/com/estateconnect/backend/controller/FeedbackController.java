package com.estateconnect.backend.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.estateconnect.backend.exception.NoFeedbacksFoundException;
import com.estateconnect.backend.model.Feedback;
import com.estateconnect.backend.service.FeedbackService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
        Feedback f = feedbackService.createFeedback(feedback);
        if (f != null) {
            return new ResponseEntity<>(f, HttpStatus.valueOf(201));
        } else {
            return new ResponseEntity<>(HttpStatus.valueOf(400));
        }
    }

    @GetMapping("/{feedbackId}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long feedbackId) {
        Optional<Feedback> f = feedbackService.getFeedbackById(feedbackId);
        if (f.isPresent()) {
            return new ResponseEntity<>(f.get(), HttpStatus.valueOf(200));
        } else {
            throw new NoFeedbacksFoundException("Sorry, feedback with ID " + feedbackId + " not found.");
        }
    }

    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        List<Feedback> f = feedbackService.getAllFeedbacks();
        return new ResponseEntity<>(f, HttpStatus.valueOf(200));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Feedback>> getFeedbackByUserId(@PathVariable Long userId) {
        List<Feedback> f = feedbackService.getFeedbacksByUserId(userId);
        return new ResponseEntity<>(f, HttpStatus.valueOf(200));
    }

    @DeleteMapping("/{feedbackId}")
    public ResponseEntity<Feedback> deleteFeedback(@PathVariable Long feedbackId) {
        feedbackService.deleteFeedback(feedbackId);
        return new ResponseEntity<>(HttpStatus.valueOf(200));
    }
}