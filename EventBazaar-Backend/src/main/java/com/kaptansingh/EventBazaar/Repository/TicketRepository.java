package com.kaptansingh.EventBazaar.Repository;

import com.kaptansingh.EventBazaar.Model.Ticket;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    @Query("SELECT t FROM Ticket t WHERE t.user.id = :userId")
    List<Ticket> findByUserId(@Param("userId") Long userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Ticket t WHERE t.event.id = :eventId")
    void deleteByEventId(@Param("eventId") Long eventId);

    @Query("SELECT t.user.email FROM Ticket t WHERE t.event.id = :eventId")
    List<String> findUsersByEventId(@Param("eventId") Long eventId);
}
