package com.kaptansingh.EventBazaar.Controller;


import com.kaptansingh.EventBazaar.Dto.TicketDto.TicketCreateRequestDto;
import com.kaptansingh.EventBazaar.Model.Ticket;
import com.kaptansingh.EventBazaar.Service.TicketService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Marks this class as a REST controller where each method returns a ResponseEntity or JSON response
@RequestMapping("/api/tickets") // Base path for all endpoints in this controller
@RequiredArgsConstructor // Lombok will automatically create a constructor for final fields (Dependency Injection)

public class TicketController {

    private final TicketService ticketService;

    @PostMapping("/{ticketId}/cancel")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<?> cancelTicket(@PathVariable Long ticketId){
        ticketService.cancelTicket(ticketId);
        return ResponseEntity.ok("Ticket cancelled successfully!");
    }

    @GetMapping("/")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllTickets(){
        List<Ticket> tickets = ticketService.getAllTickets();
        return ResponseEntity.ok(tickets);
    }
}
