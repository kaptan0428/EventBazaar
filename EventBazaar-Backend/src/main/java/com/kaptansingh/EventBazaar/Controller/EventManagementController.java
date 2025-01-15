package com.kaptansingh.EventBazaar.Controller;


import com.kaptansingh.EventBazaar.Dto.EventDto.EventCreateRequestDto;
import com.kaptansingh.EventBazaar.Dto.EventDto.EventUpdateRequestDto;
import com.kaptansingh.EventBazaar.Model.Event;
import com.kaptansingh.EventBazaar.Service.EventService;
import com.kaptansingh.EventBazaar.Service.MailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Marks this class as a REST controller where each method returns a ResponseEntity or JSON response
@PreAuthorize("hasRole('ROLE_ORGANIZER')") // This controller is only accessible to users with the 'ROLE_ORGANIZER' role
@RequestMapping("/api/events") // Base path for all endpoints in this controller
@RequiredArgsConstructor // Lombok will automatically create a constructor for final fields (Dependency Injection)
public class EventManagementController {

    private final EventService eventService;
    private final MailService mailService;

    @PostMapping("/")
    public ResponseEntity<?> createEvent(@Valid @RequestBody EventCreateRequestDto eventDto){
        eventService.createEvent(eventDto);
        return ResponseEntity.ok("Event created successfully");
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<?> updateEvent(@PathVariable Long eventId, @Valid @RequestBody EventUpdateRequestDto eventDto){
        eventService.updateEvent(eventId, eventDto);
        return ResponseEntity.ok("Event updated successfully");
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long eventId){
        eventService.deleteEvent(eventId);
        return ResponseEntity.ok("Event deleted successfully");
    }

    @GetMapping("/organizer")
    public ResponseEntity<?> getAllEventsOfLoggedInOrganizer(){
        List<Event> events = eventService.getAllEventsOfLoggedInOrganizer();
        return ResponseEntity.ok(events);
    }

    // This endpoint will notify all the users of the event
    @PostMapping("/{eventId}/notify")
    public ResponseEntity<?> notifyUsers(@PathVariable Long eventId, @RequestParam String subject, @RequestParam String body){

        List<String> emails = eventService.getAllUsersOfEvent(eventId);
        try {
            mailService.sendEmails(emails, subject, body);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Emails could not be sent");
        }
        return ResponseEntity.ok("Emails sent successfully");
    }
}
