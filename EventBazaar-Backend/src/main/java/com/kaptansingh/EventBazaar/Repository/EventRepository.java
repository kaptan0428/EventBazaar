package com.kaptansingh.EventBazaar.Repository;


import com.kaptansingh.EventBazaar.Model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("SELECT e FROM Event e WHERE e.organizerId = :organizerId")
    List<Event> findByOrganizerId(@Param("organizerId") Long organizerId);
}
