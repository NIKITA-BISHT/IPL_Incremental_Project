import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketBooking } from '../../types/TicketBooking';
import { Match } from '../../types/Match';
import { IplService } from '../../services/ipl.service';

@Component({
  selector: 'app-ticketbooking',
  templateUrl: './ticketbooking.component.html',
  styleUrls: ['./ticketbooking.component.scss']
})
export class TicketBookingComponent implements OnInit {

  ticketBookingForm!: FormGroup;
  ticketBooking: TicketBooking | null = null;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  matches: Match[] = [];

  constructor(private fb: FormBuilder, private iplService: IplService) {}

  ngOnInit(): void {
    this.iplService.getAllMatches().subscribe({
      next: (data) => { this.matches = data; },
      error: () => { this.matches = []; }
    });

    this.ticketBookingForm = this.fb.group({
      bookingId: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      matchId: [null, Validators.required],
      numberOfTickets: [null, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.ticketBookingForm.valid) {
      this.ticketBooking = { ...this.ticketBookingForm.value };

      this.iplService.createBooking(this.ticketBooking!).subscribe({
        next: () => {
          this.successMessage = 'Tickets booked successfully!';
          this.errorMessage = null;
          this.resetForm();
        },
        error: () => {
          this.errorMessage = 'Failed to book tickets. Please try again.';
          this.successMessage = null;
        }
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.successMessage = null;
    }
  }

  resetForm(): void {
    this.ticketBookingForm.reset({
      bookingId: null,
      email: '',
      matchId: null,
      numberOfTickets: null
    });
  }
}