package com.kaptansingh.EventBazaar.Model;


import com.kaptansingh.EventBazaar.Enum.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.Set;

@Data // Lombok annotation to generate getters, setters, equals, hashCode, and toString methods
@NoArgsConstructor // Lombok: Generates a no-arguments constructor
@AllArgsConstructor // Lombok: Generates an all-arguments constructor
@Entity // JPA: Marks this class as a JPA entity representing a table in the database
@Builder // Lombok: Provides a builder pattern for creating instances of the class
@Table(name = "users") // JPA: Specifies the name of the table in the database for this entity
public class User {
    @Id // JPA: Specifies the primary key of the entity
    @GeneratedValue(strategy = GenerationType.IDENTITY) // JPA: Auto-generates the primary key using the database's identity column
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = true)
    private String lastName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING) // JPA: Specifies that the role will be stored as a string representation of the enum value
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "roles", nullable = false)
    private Set<Role> roles;

    @Column(name = "phone", nullable = false)
    private String phone;

    @CreationTimestamp // Automatically sets this field to the current timestamp when the entity is first persisted
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp // Automatically updates this field to the current timestamp every time the entity is updated
    @Column(name = "updated_at")
    private Timestamp updatedAt;

}
