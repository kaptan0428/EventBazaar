package com.kaptansingh.EventBazaar.Model;

import com.kaptansingh.EventBazaar.Enum.EventCategory;
import com.kaptansingh.EventBazaar.Enum.EventStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.Date;

@Data // Lombok annotation to generate getters, setters, equals, hashCode, and toString methods
@NoArgsConstructor // Lombok: Generates a no-arguments constructor
@AllArgsConstructor // Lombok: Generates an all-arguments constructor
@Entity // JPA: Marks this class as a JPA entity representing a table in the database
@Builder // Lombok: Provides a builder pattern for creating instances of the class
@Table(name = "events") // JPA: Specifies the name of the table in the database for this entity
public class Event {

    @Id // JPA: Specifies the primary key of the entity
    @GeneratedValue(strategy = GenerationType.IDENTITY) // JPA: Auto-generates the primary key using the database's identity column
    private Long id;

    @Column(name = "organizerId", nullable = false)
    private Long organizerId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = true)
    private String description;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "start_time", nullable = false)
    private Timestamp startTime;

    @Column(name = "end_time", nullable = true)
    private Timestamp endTime;

    @Column(name = "contact", nullable = false)
    private String contact;

    @Column(name = "quantity", nullable = false)
    @Min(value = 1, message = "Quantity should be at least 1")
    private Integer quantity;

    @Column(name = "price", nullable = false)
    private Integer price;

    @Column(name = "image_url", nullable = true)
    private String imageUrl;

    @Enumerated(EnumType.STRING) // JPA: Specifies that the role will be stored as a string representation of the enum value
    @CollectionTable(name = "event_categories", joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "category", nullable = true)
    private EventCategory category;

    @Enumerated(EnumType.STRING) // JPA: Specifies that the role will be stored as a string representation of the enum value
    @CollectionTable(name = "event_status", joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "status", nullable = false)
    private EventStatus status;

    @CreationTimestamp // Automatically sets this field to the current timestamp when the entity is first persisted
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp // Automatically updates this field to the current timestamp every time the entity is updated
    @Column(name = "updated_at")
    private Timestamp updatedAt;
}
