export class TicketBooking {
    bookingId: number;
    email: string;
    matchId: number;
    numberOfTickets: number;

    constructor(
        bookingId: number,
        email: string,
        matchId: number,
        numberOfTickets: number
    ) {
        this.bookingId = bookingId;
        this.email = email;
        this.matchId = matchId;
        this.numberOfTickets = numberOfTickets;
    }

    displayInfo(): void {
        console.log(`Booking ID: ${this.bookingId}, 
            Email: ${this.email}, 
            Number Of Tickets: ${this.numberOfTickets}`);
    }
}