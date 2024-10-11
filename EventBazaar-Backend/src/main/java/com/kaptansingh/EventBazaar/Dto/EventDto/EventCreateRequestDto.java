package com.kaptansingh.EventBazaar.Dto.EventDto;

import com.kaptansingh.EventBazaar.Enum.EventCategory;
import com.kaptansingh.EventBazaar.Enum.EventStatus;
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

    @NotNull(message = "Price is required")
    private Integer price;


    private String imageUrl;

    @NotNull(message = "Category is required")
    private EventCategory category;

   @NotNull(message = "Status is required")
    private EventStatus status;
}
