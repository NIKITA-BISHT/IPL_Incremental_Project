import { Component, OnInit } from "@angular/core";
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
  ticketBookings: TicketBooking[] = [];
  role: string | null = null;

  constructor(private iplService: IplService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    this.loadTeams();
    this.loadCricketers();
    this.loadMatches();
    this.loadVotes();
    this.loadTicketBookings();
  }

  loadTeams(): void {
    this.iplService.getAllTeams().subscribe({
      next: (data) => { this.teams = data; },
      error: () => { this.teams = []; }
    });
  }

  loadCricketers(): void {
    this.iplService.getAllCricketers().subscribe({
      next: (data) => { this.cricketers = data; },
      error: () => { this.cricketers = []; }
    });
  }

  loadMatches(): void {
    this.iplService.getAllMatches().subscribe({
      next: (data) => { this.matches = data; },
      error: () => { this.matches = []; }
    });
  }

  loadVotes(): void {
    this.iplService.getAllVotes().subscribe({
      next: (data) => {
        this.votes = data;
      },
      error: () => { this.votes = []; }
    });
  }

  loadTicketBookings(): void {
    this.iplService.getAllTicketBookings().subscribe({
      next: (data) => {
        this.ticketBookings = data;
      },
      error: () => { this.ticketBookings = []; }
    });
  }

  getVoteCricketerId(vote: any): string {
    if (vote.cricketer?.cricketerId) return vote.cricketer.cricketerId;
    if (vote.cricketerId) return vote.cricketerId;
    return '-';
  }

  getVoteTeamId(vote: any): string {
    if (vote.team?.teamId) return vote.team.teamId;
    if (vote.teamId) return vote.teamId;
    return '-';
  }

  deleteTeam(teamId: number): void {
    if (confirm("Are you sure you want to delete this team?")) {
      this.iplService.deleteTeam(teamId).subscribe({
        next: () => { alert("Team deleted successfully"); this.loadTeams(); },
        error: () => { alert("Failed to delete team"); }
      });
    }
  }

  deleteCricketer(cricketerId: number): void {
    if (confirm("Are you sure you want to delete this cricketer?")) {
      this.iplService.deleteCricketer(cricketerId).subscribe({
        next: () => { alert("Cricketer deleted successfully"); this.loadCricketers(); },
        error: () => { alert("Failed to delete cricketer"); }
      });
    }
  }

  deleteMatch(matchId: number): void {
    if (confirm("Are you sure you want to delete this match?")) {
      this.iplService.deleteMatch(matchId).subscribe({
        next: () => { alert("Match deleted successfully"); this.loadMatches(); },
        error: () => { alert("Failed to delete match"); }
      });
    }
  }
}