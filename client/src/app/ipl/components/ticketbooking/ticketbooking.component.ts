import { Component, OnInit } from "@angular/core";import { FormBuilder, FormGroup } from "@angular/forms";

import { IplService } from "../../services/ipl.service";
import { TicketBooking } from "../../types/TicketBooking";
import { Match } from "../../types/Match";

@Component({
  selector: "app-ticket-booking",
  templateUrl: "./ticketbooking.component.html",
  styleUrls: ["./ticketbooking.component.scss"]
})
export class TicketBookingComponent implements OnInit {
  ticketBookingForm: FormGroup;
  ticketBooking: TicketBooking | null = null;

  matches: Match[] = [];

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private iplService: IplService
  ) {
    this.ticketBookingForm = this.formBuilder.group({
      bookingId: [null],

      email: [""],
      userEmail: [""],
      bookingEmail: [""],

      matchId: [""],
      selectedMatchId: [""],
      match: [""],

      numberOfTickets: [""],
      tickets: [""],
      ticketCount: [""],
      noOfTickets: [""]
    });
  }

  ngOnInit(): void {
    this.loadMatches();
  }

  loadMatches(): void {
    this.iplService.getAllMatches().subscribe({
      next: (matches: Match[]) => {
        this.matches = matches;
      },
      error: () => {
        this.matches = [];
      }
    });
  }

  onSubmit(): void {
    this.clearMessages();

    const bookingData = this.getBookingFormData();

    if (!bookingData.email || !bookingData.matchId || !bookingData.numberOfTickets) {
      this.showValidationError();
      return;
    }

    this.ticketBooking = new TicketBooking(
      bookingData.bookingId,
      bookingData.email,
      bookingData.matchId,
      bookingData.numberOfTickets
    );

    this.createBooking();
  }

  resetForm(): void {
    this.ticketBookingForm.reset({
      bookingId: null,

      email: "",
      userEmail: "",
      bookingEmail: "",

      matchId: "",
      selectedMatchId: "",
      match: "",

      numberOfTickets: "",
      tickets: "",
      ticketCount: "",
      noOfTickets: ""
    });

    this.ticketBooking = null;
    this.clearMessages();
  }

  private createBooking(): void {
    if (!this.ticketBooking) {
      this.showValidationError();
      return;
    }

    this.iplService.createBooking(this.ticketBooking).subscribe({
      next: () => {
        this.successMessage = "Ticket booked successfully!";
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || "Please fill out all required fields correctly.";
        this.successMessage = null;
      }
    });
  }

  private getBookingFormData(): {
    bookingId: number;
    email: string;
    matchId: number;
    numberOfTickets: number;
  } {
    const value = this.ticketBookingForm.value;

    return {
      bookingId: value.bookingId,
      email: value.email || value.userEmail || value.bookingEmail,
      matchId: value.matchId || value.selectedMatchId || value.match,
      numberOfTickets:
        value.numberOfTickets ||
        value.tickets ||
        value.ticketCount ||
        value.noOfTickets
    };
  }

  private showValidationError(): void {
    this.errorMessage = "Please fill out all required fields correctly.";
    this.successMessage = null;
    this.ticketBookingForm.markAllAsTouched();
  }

  private clearMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }
}