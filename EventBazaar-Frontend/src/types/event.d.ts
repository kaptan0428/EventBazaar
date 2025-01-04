

declare interface Event{
    id: number;
    organizerId: number;
    title: string;
    description: string;
    location: string;
    startTime: string;
    endTime: string;
    contact: string;
    quantity: number;
    price: number;
    imageUrl: string;
    category: string;
    status: string;
}

declare interface EventCreateRequest{
    title: string;
    description: string;
    location: string;
    startTime: string;
    endTime: string;
    contact: string;
    quantity: number;
    price: number;
    imageUrl: string;
    category: string;
    status: string;
}

declare interface EventUpdateRequest{
    title: string;
    description: string;
    location: string;
    startTime: string;
    endTime: string;
    contact: string;
    quantity: number;
    price: number;
    imageUrl: string;
    category: string;
    status: string;
}

declare interface TicketCreateRequest {
    quantity: number;
    totalPrice: number;
}