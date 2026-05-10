// import { Component, OnInit } from "@angular/core";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// import { IplService } from "../../services/ipl.service";
// import { Team } from "../../types/Team";
// import { Cricketer } from "../../types/Cricketer";
// import { Match } from "../../types/Match";
// import { Vote } from "../../types/Vote";
// import { TicketBooking } from "../../types/TicketBooking";

// @Component({
//   selector: "app-dashboard",
//   templateUrl: "./dashboard.component.html",
//   styleUrls: ["./dashboard.component.scss"]
// })
// export class DashboardComponent implements OnInit {
//   teams: Team[] = [];
//   cricketers: Cricketer[] = [];
//   matches: Match[] = [];
//   votes: Vote[] = [];
//   ticketsBooked: TicketBooking[] = [];

//   emailForm: FormGroup;

//   constructor(
//     private iplService: IplService,
//     private formBuilder: FormBuilder
//   ) {
//     this.emailForm = this.formBuilder.group({
//       email: ["", [Validators.required, Validators.email]]
//     });
//   }

//   ngOnInit(): void {
//     this.loadDashboardData();
//   }

//   private loadDashboardData(): void {
//     this.loadTeams();
//     this.loadCricketers();
//     this.loadMatches();
//     this.loadVotes();
//   }

//   loadTeams(): void {
//     this.iplService.getAllTeams().subscribe({
//       next: (teams: Team[]) => {
//         this.teams = teams;
//       },
//       error: () => {
//         this.teams = [];
//       }
//     });
//   }

//   loadCricketers(): void {
//     this.iplService.getAllCricketers().subscribe({
//       next: (cricketers: Cricketer[]) => {
//         this.cricketers = cricketers;
//       },
//       error: () => {
//         this.cricketers = [];
//       }
//     });
//   }

//   loadMatches(): void {
//     this.iplService.getAllMatches().subscribe({
//       next: (matches: Match[]) => {
//         this.matches = matches;
//       },
//       error: () => {
//         this.matches = [];
//       }
//     });
//   }

//   loadVotes(): void {
//     this.iplService.getAllVotes().subscribe({
//       next: (votes: Vote[]) => {
//         this.votes = votes;
//       },
//       error: () => {
//         this.votes = [];
//       }
//     });
//   }

//   onSubmitEmail(): void {
//     if (this.emailForm.invalid) {
//       this.ticketsBooked = [];
//       this.emailForm.markAllAsTouched();
//       return;
//     }

//     const email = this.emailForm.value.email;
//     this.loadBookingsByEmail(email);
//   }

//   private loadBookingsByEmail(email: string): void {
//     this.iplService.getBookingsByUserEmail(email).subscribe({
//       next: (bookings: TicketBooking[]) => {
//         this.ticketsBooked = bookings;
//       },
//       error: () => {
//         this.ticketsBooked = [];
//       }
//     });
//   }
// }

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { IplService } from "../../services/ipl.service";
import { Team } from "../../types/Team";
import { Cricketer } from "../../types/Cricketer";
import { Match } from "../../types/Match";
import { Vote } from "../../types/Vote";
import { TicketBooking } from "../../types/TicketBooking";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  teams: Team[] = [];
  cricketers: Cricketer[] = [];
  matches: Match[] = [];
  votes: Vote[] = [];
  ticketsBooked: TicketBooking[] = [];

  emailForm: FormGroup;
  role: string | null = null;

  constructor(
    private iplService: IplService,
    private formBuilder: FormBuilder
  ) {
    this.emailForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    this.loadAdminData();
  }

  loadAdminData(): void {
    this.loadTeams();
    this.loadCricketers();
    this.loadMatches();
    this.loadVotes();
  }

  loadTeams(): void {
    this.iplService.getAllTeams().subscribe({
      next: (teams: Team[]) => {
        this.teams = teams;
      },
      error: () => {
        this.teams = [];
      }
    });
  }

  loadCricketers(): void {
    this.iplService.getAllCricketers().subscribe({
      next: (cricketers: Cricketer[]) => {
        this.cricketers = cricketers;
      },
      error: () => {
        this.cricketers = [];
      }
    });
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

  loadVotes(): void {
    if (this.iplService.getAllVotes) {
      this.iplService.getAllVotes().subscribe({
        next: (votes: Vote[]) => {
          this.votes = votes;
        },
        error: () => {
          this.votes = [];
        }
      });
    }
  }

  deleteTeam(teamId: number): void {
    const confirmed = window.confirm("Are you sure you want to delete this team?");

    if (!confirmed) {
      return;
    }

    this.iplService.deleteTeam(teamId).subscribe({
      next: () => {
        this.loadAdminData();
      },
      error: () => {
        this.loadAdminData();
      }
    });
  }

  onSubmitEmail(): void {
    if (this.emailForm.invalid) {
      this.ticketsBooked = [];
      this.emailForm.markAllAsTouched();
      return;
    }

    const email = this.emailForm.value.email;

    this.iplService.getBookingsByUserEmail(email).subscribe({
      next: (bookings: TicketBooking[]) => {
        this.ticketsBooked = bookings;
      },
      error: () => {
        this.ticketsBooked = [];
      }
    });
  }

  isAdmin(): boolean {
    return this.role === "ADMIN";
  }
}