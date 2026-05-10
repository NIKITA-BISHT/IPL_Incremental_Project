import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { IplService } from "../../services/ipl.service";
import { Match } from "../../types/Match";
import { Team } from "../../types/Team";

@Component({
  selector: "app-match-edit",
  templateUrl: "./matchedit.component.html",
  styleUrls: ["./matchedit.component.scss"]
})
export class MatchEditComponent implements OnInit {
  matchForm: FormGroup;
  match: Match | null = null;
  teams: Team[] = [];

  matchId: number = 0;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private iplService: IplService,
    private route: ActivatedRoute
  ) {
    this.matchForm = this.formBuilder.group({
      firstTeamId: ["", Validators.required],
      secondTeamId: ["", Validators.required],
      matchDate: ["", Validators.required],
      venue: ["", Validators.required],
      result: ["", Validators.required],
      status: ["", Validators.required],
      winnerTeamId: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    const routeId =
      this.route.snapshot.paramMap.get("matchId") ||
      this.route.snapshot.paramMap.get("id");

    this.matchId = Number(routeId);

    this.loadTeams();

    if (this.matchId) {
      this.loadMatchDetails(this.matchId);
    }
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

  loadMatchDetails(matchId: number): void {
    this.iplService.getMatchById(matchId).subscribe({
      next: (match: Match) => {
        this.match = match;

        const firstTeamId =
          match.firstTeam?.teamId ||
          match.firstTeamId ||
          "";

        const secondTeamId =
          match.secondTeam?.teamId ||
          match.secondTeamId ||
          "";

        const winnerTeamId =
          match.winnerTeam?.teamId ||
          match.winnerTeamId ||
          "";

        this.matchForm.patchValue({
          firstTeamId: firstTeamId,
          secondTeamId: secondTeamId,
          matchDate: this.formatDateForInput(match.matchDate),
          venue: match.venue,
          result: match.result,
          status: match.status,
          winnerTeamId: winnerTeamId
        });
      },
      error: () => {
        this.errorMessage = "Unable to load match details.";
        this.successMessage = null;
      }
    });
  }

  onSubmit(): void {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.matchForm.invalid) {
      this.errorMessage = "Please fill out all required fields correctly.";
      this.matchForm.markAllAsTouched();
      return;
    }

    const value = this.matchForm.value;

    const firstTeam = this.teams.find(
      (team: Team) => team.teamId === Number(value.firstTeamId)
    );

    const secondTeam = this.teams.find(
      (team: Team) => team.teamId === Number(value.secondTeamId)
    );

    const winnerTeam = this.teams.find(
      (team: Team) => team.teamId === Number(value.winnerTeamId)
    );

    if (!firstTeam || !secondTeam || !winnerTeam) {
      this.errorMessage = "Please fill out all required fields correctly.";
      return;
    }

    const updatedMatch = new Match(
      this.matchId,
      firstTeam,
      secondTeam,
      new Date(value.matchDate),
      value.venue,
      value.result,
      value.status,
      winnerTeam
    );

    this.iplService.updateMatch(updatedMatch).subscribe({
      next: (response: Match) => {
        this.match = response;
        this.successMessage = "Match updated successfully!";
        this.errorMessage = null;
      },
      error: () => {
        this.errorMessage = "Unable to update match.";
        this.successMessage = null;
      }
    });
  }

  resetForm(): void {
    this.matchForm.reset({
      firstTeamId: "",
      secondTeamId: "",
      matchDate: "",
      venue: "",
      result: "",
      status: "",
      winnerTeamId: ""
    });

    this.successMessage = null;
    this.errorMessage = null;
    this.match = null;
  }

  private formatDateForInput(date: Date | string): string {
    if (!date) {
      return "";
    }

    const convertedDate = new Date(date);
    return convertedDate.toISOString().split("T")[0];
  }
}