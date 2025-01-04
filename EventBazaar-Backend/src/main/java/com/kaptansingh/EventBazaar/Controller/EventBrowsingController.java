package com.kaptansingh.EventBazaar.Controller;

import com.kaptansingh.EventBazaar.Dto.TicketDto.TicketCreateRequestDto;
import com.kaptansingh.EventBazaar.Model.Event;
import com.kaptansingh.EventBazaar.Model.Ticket;
import com.kaptansingh.EventBazaar.Service.EventService;
import com.kaptansingh.EventBazaar.Service.TicketService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Marks this class as a REST controller where each method returns a ResponseEntity or JSON response
@RequestMapping("/api/events") // Base path for all endpoints in this controller
@RequiredArgsConstructor // Lombok will automatically create a constructor for final fields (Dependency Injection)
public class EventBrowsingController {

    private final EventService eventService;
    private final TicketService ticketService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllEvents(){
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/{eventId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getEventById(@PathVariable Long eventId){
        Event event = eventService.findByID(eventId);
        return ResponseEntity.ok(event);
    }

    @PostMapping("/{eventId}/book")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> bookEvent(@PathVariable Long eventId, @Valid @RequestBody TicketCreateRequestDto ticketDto){
        Ticket ticket = ticketService.createTicket(eventId, ticketDto);
        return ResponseEntity.ok(ticket);
    }

}
