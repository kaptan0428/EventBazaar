

declare interface Ticket {
    id: number;
    event: Event;
    user: User;
    quantity: number;
    totalPrice: number;
}

declare interface TicketCreateRequest {
    quantity: number;
    totalPrice: number;
}