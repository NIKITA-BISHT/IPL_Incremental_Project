import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IplService } from "../../services/ipl.service";
import { Match } from "../../types/Match";
import { Team } from "../../types/Team";

@Component({
  selector: "app-match-create",
  templateUrl: "./matchcreate.component.html",
  styleUrls: ["./matchcreate.component.scss"]
})
export class MatchCreateComponent implements OnInit {
  matchForm: FormGroup;
  match: Match | null = null;
  successMessage: string = "";
  errorMessage: string = "";
  teams: Team[] = [];

  constructor(private fb: FormBuilder, private iplService: IplService) {
    this.matchForm = this.fb.group({
      matchId: [null, Validators.required],
      firstTeamId: ["", Validators.required],
      secondTeamId: ["", Validators.required],
      matchDate: ["", Validators.required],
      venue: ["", Validators.required],
      status: ["", Validators.required],

      // Not required for upcoming matches
      result: [""],
      winnerTeamId: [""]
    });
  }

  ngOnInit(): void {
    this.loadTeams();
    this.applyStatusValidation();
  }

  loadTeams(): void {
    this.iplService.getAllTeams().subscribe({
      next: (data) => {
        this.teams = data;
      },
      error: () => {
        this.teams = [];
      }
    });
  }

  applyStatusValidation(): void {
    this.matchForm.get("status")?.valueChanges.subscribe((status) => {
      const resultControl = this.matchForm.get("result");
      const winnerTeamControl = this.matchForm.get("winnerTeamId");

      resultControl?.clearValidators();
      winnerTeamControl?.clearValidators();

      if (status === "Played") {
        resultControl?.setValidators([Validators.required]);
        winnerTeamControl?.setValidators([Validators.required]);
      } else if (status === "Upcoming") {
        resultControl?.setValue("");
        winnerTeamControl?.setValue("");
      }

      resultControl?.updateValueAndValidity();
      winnerTeamControl?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    this.successMessage = "";
    this.errorMessage = "";

    if (this.matchForm.invalid) {
      this.errorMessage = "Please fill out all required fields correctly.";
      this.matchForm.markAllAsTouched();
      return;
    }

    this.addMatch();
  }

  addMatch(): void {
    const value = this.matchForm.value;

    const firstTeam = this.teams.find(
      (team) => team.teamId === Number(value.firstTeamId)
    );

    const secondTeam = this.teams.find(
      (team) => team.teamId === Number(value.secondTeamId)
    );

    const winnerTeam = this.teams.find(
      (team) => team.teamId === Number(value.winnerTeamId)
    );

    if (!firstTeam || !secondTeam) {
      this.errorMessage = "Please select both teams correctly.";
      return;
    }

    if (Number(value.firstTeamId) === Number(value.secondTeamId)) {
      this.errorMessage = "First Team and Second Team cannot be the same.";
      return;
    }

    if (value.status === "Played" && !winnerTeam) {
      this.errorMessage = "Please select winner team for played match.";
      return;
    }

    this.match = new Match(
      value.matchId,
      firstTeam,
      secondTeam,
      new Date(value.matchDate),
      value.venue,
      value.status === "Played" ? value.result : "Not Played Yet",
      value.status,
      value.status === "Played" ? winnerTeam! : null as any
    );

    console.log("MATCH PAYLOAD:", this.match);

    this.iplService.addMatch(this.match).subscribe({
      next: () => {
        this.resetForm();
        this.successMessage = "Match created successfully!";
        this.errorMessage = "";
      },
      error: (error) => {
        this.handleError(error);
      }
    });
  }

  resetForm(): void {
    this.matchForm.reset({
      matchId: null,
      firstTeamId: "",
      secondTeamId: "",
      matchDate: "",
      venue: "",
      status: "",
      result: "",
      winnerTeamId: ""
    });

    this.errorMessage = "";
    this.match = null;
  }

  handleError(error: any): void {
    console.log("MATCH ERROR:", error);

    this.errorMessage =
      error?.error?.message || "Please fill out all required fields correctly.";
  }
}