package com.kaptansingh.EventBazaar.Dto.EventDto;

import com.kaptansingh.EventBazaar.Enum.EventCategory;
import com.kaptansingh.EventBazaar.Enum.EventStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class EventCreateRequestDto {

    @NotEmpty(message = "Title is required")
    private String title;

    @NotEmpty(message = "Description is required")
    private String description;

    @NotEmpty(message = "Location is required")
    private String location;

    @NotNull(message = "Start Time is required")
    private Timestamp startTime;


    private Timestamp endTime;


    @NotEmpty(message = "Contact is required")
    private String contact;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity should be at least 1")
    private Integer quantity;

    @NotNull(message = "Price is required")
    private Integer price;


    private String imageUrl;

    @NotNull(message = "Category is required")
    private EventCategory category;

   @NotNull(message = "Status is required")
    private EventStatus status;
}
