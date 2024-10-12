package com.kaptansingh.EventBazaar.Service;

import com.kaptansingh.EventBazaar.Dto.TicketDto.TicketCreateRequestDto;
import com.kaptansingh.EventBazaar.Exception.EventNotFoundException;
import com.kaptansingh.EventBazaar.Exception.UserNotFoundException;
import com.kaptansingh.EventBazaar.Model.Event;
import com.kaptansingh.EventBazaar.Model.Ticket;
import com.kaptansingh.EventBazaar.Model.User;
import com.kaptansingh.EventBazaar.Repository.EventRepository;
import com.kaptansingh.EventBazaar.Repository.TicketRepository;
import com.kaptansingh.EventBazaar.Repository.UserRepository;
import com.kaptansingh.EventBazaar.Utils.SecurityUtils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor // Lombok will automatically create a constructor for 'final' fields(Dependency Injection)
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final SecurityUtils  securityUtils;

    public Ticket createTicket(Long eventId, TicketCreateRequestDto ticketDto) {
        User user = getLoggedInUserHelper();
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new EventNotFoundException("Event not found!"));

        if(event.getQuantity() < ticketDto.getQuantity()){
            throw new EventNotFoundException("Not enough tickets available!");
        }

        Ticket ticket = new Ticket();
        ticket.setUser(user);
        ticket.setEvent(event);
        ticket.setQuantity(ticketDto.getQuantity());
        ticket.setTotalPrice(ticketDto.getTotalPrice());

        event.setQuantity(event.getQuantity() - ticketDto.getQuantity());
        ticketRepository.save(ticket);
        return ticket;
    }

    public void cancelTicket(Long ticketId) {
        User user = getLoggedInUserHelper();


        Ticket ticket = ticketRepository.findById(ticketId).orElseThrow(() -> new EventNotFoundException("Ticket not found!"));

        if (user.getRoles().stream().noneMatch(role -> role.toString().equals("ROLE_ADMIN")) && !ticket.getUser().getId().equals(user.getId())) {
            throw new EventNotFoundException("Ticket not found!");
        }

        Event event = ticket.getEvent();

        event.setQuantity(event.getQuantity() + ticket.getQuantity());
        ticketRepository.delete(ticket);
    }

    public List<Ticket> getTickets() {
        User user = getLoggedInUserHelper();
        return ticketRepository.findByUserId(user.getId());
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }




    //////////////////////// Helper Methods //////////////////////////////////

    private User getLoggedInUserHelper() {
        UserDetails userDetails = securityUtils.getAuthenticatedUserDetails();
        String email = userDetails.getUsername();
        Optional<User> userOptional = userRepository.findByEmail(email);
        if(userOptional.isEmpty()){
            throw new UserNotFoundException("User not found!");
        }
        return userOptional.get();
    }



}
