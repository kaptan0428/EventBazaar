package com.kaptansingh.EventBazaar.Dto.EventDto;

import com.kaptansingh.EventBazaar.Enum.EventCategory;
import com.kaptansingh.EventBazaar.Enum.EventStatus;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class EventUpdateRequestDto {

    private String title;
    private String description;
    private String location;
    private Timestamp startTime;
    private Timestamp endTime;
    private String contact;
    private Integer price;
    private String imageUrl;
    private EventCategory category;
    private EventStatus status;
}
