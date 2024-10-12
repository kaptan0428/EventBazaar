package com.kaptansingh.EventBazaar.Dto.TicketDto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TicketCreateRequestDto {

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity should be at least 1")
    private Integer quantity;

    @NotNull(message = "total price is required")
    private Double totalPrice;
}
