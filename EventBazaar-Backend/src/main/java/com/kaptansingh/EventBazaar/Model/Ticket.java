package com.kaptansingh.EventBazaar.Model;


import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data // Lombok annotation to generate getters, setters, equals, hashCode, and toString methods
@NoArgsConstructor // Lombok: Generates a no-arguments constructor
@AllArgsConstructor // Lombok: Generates an all-arguments constructor
@Entity // JPA: Marks this class as a JPA entity representing a table in the database
@Builder // Lombok: Provides a builder pattern for creating instances of the class
@Table(name = "tickets") // JPA: Specifies the name of the table in the database for this entity
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "quantity", nullable = false)
    @Min(value = 1, message = "Quantity should be at least 1")
    private Integer quantity;

    @Column(name = "total_price", nullable = false)
    private Double totalPrice;

    @CreationTimestamp // Automatically sets this field to the current timestamp when the entity is first persisted
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;
}
