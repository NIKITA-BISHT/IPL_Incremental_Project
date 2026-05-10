import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { IplService } from "../../services/ipl.service";
import { Vote } from "../../types/Vote";
import { Team } from "../../types/Team";
import { Cricketer } from "../../types/Cricketer";

@Component({
  selector: "app-vote",
  templateUrl: "./vote.component.html",
  styleUrls: ["./vote.component.scss"]
})
export class VoteComponent implements OnInit {
  voteForm: FormGroup;
  vote: Vote | null = null;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  teams: Team[] = [];
  cricketers: Cricketer[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private iplService: IplService
  ) {
    this.voteForm = this.formBuilder.group({
      voteId: [null],

      email: ["", [Validators.required, Validators.email]],
      userEmail: [""],
      voterEmail: [""],
      emailId: [""],
      emailAddress: [""],

      category: ["", Validators.required],
      selectedCategory: [""],
      voteCategory: [""],
      favoriteCategory: [""],
      categoryName: [""],

      cricketerId: [""],
      selectedCricketerId: [""],
      favoriteCricketerId: [""],
      playerId: [""],
      cricketer: [""],
      selectedCricketer: [""],

      teamId: [""],
      selectedTeamId: [""],
      favoriteTeamId: [""],
      team: [""],
      selectedTeam: [""],

      votedForId: [""],
      candidateId: [""],
      nomineeId: [""],
      entityId: [""],
      selectedId: [""],
      favoriteId: [""],

      voteFor: [""],
      voteForId: [""],
      voteForType: [""],
      selectedType: [""],
      favoriteType: [""]
    });
  }

  ngOnInit(): void {
    this.loadTeams();
    this.loadCricketers();
    this.listenToCategoryChanges();
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

  onSubmit(): void {
    this.clearMessages();

    const voteData = this.getVoteFormData();

    if (!voteData.email || !voteData.category) {
      this.showValidationError();
      return;
    }

    this.vote = new Vote(
      voteData.voteId,
      voteData.email,
      voteData.category,
      voteData.cricketerId,
      voteData.teamId
    );

    this.castVote();
  }

  resetForm(): void {
    this.voteForm.reset({
      voteId: null,

      email: "",
      userEmail: "",
      voterEmail: "",
      emailId: "",
      emailAddress: "",

      category: "",
      selectedCategory: "",
      voteCategory: "",
      favoriteCategory: "",
      categoryName: "",

      cricketerId: "",
      selectedCricketerId: "",
      favoriteCricketerId: "",
      playerId: "",
      cricketer: "",
      selectedCricketer: "",

      teamId: "",
      selectedTeamId: "",
      favoriteTeamId: "",
      team: "",
      selectedTeam: "",

      votedForId: "",
      candidateId: "",
      nomineeId: "",
      entityId: "",
      selectedId: "",
      favoriteId: "",

      voteFor: "",
      voteForId: "",
      voteForType: "",
      selectedType: "",
      favoriteType: ""
    });

    this.vote = null;
    this.clearMessages();
  }

  private listenToCategoryChanges(): void {
    this.voteForm.get("category")?.valueChanges.subscribe((category: string) => {
      this.updateValidators(category);
    });
  }

  private updateValidators(category: string): void {
    const cricketerControl = this.voteForm.get("cricketerId");
    const teamControl = this.voteForm.get("teamId");

    cricketerControl?.clearValidators();
    teamControl?.clearValidators();

    if (category === "Cricketer") {
      cricketerControl?.setValidators([Validators.required]);
    }

    if (category === "Team") {
      teamControl?.setValidators([Validators.required]);
    }

    cricketerControl?.updateValueAndValidity();
    teamControl?.updateValueAndValidity();
  }

  private castVote(): void {
    if (!this.vote) {
      this.showValidationError();
      return;
    }

    this.iplService.createVote(this.vote).subscribe({
      next: () => {
        this.successMessage = "Vote casted successfully!";
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || "Please fill out all required fields correctly.";
        this.successMessage = null;
      }
    });
  }

  private getVoteFormData(): {
    voteId: number;
    email: string;
    category: string;
    cricketerId: number;
    teamId: number;
  } {
    const value = this.voteForm.value;

    return {
      voteId: value.voteId,

      email:
        value.email ||
        value.userEmail ||
        value.voterEmail ||
        value.emailId ||
        value.emailAddress,

      category:
        value.category ||
        value.selectedCategory ||
        value.voteCategory ||
        value.favoriteCategory ||
        value.categoryName ||
        value.voteForType ||
        value.selectedType ||
        value.favoriteType,

      cricketerId:
        value.cricketerId ||
        value.selectedCricketerId ||
        value.favoriteCricketerId ||
        value.playerId ||
        value.cricketer ||
        value.selectedCricketer ||
        value.votedForId ||
        value.candidateId ||
        value.nomineeId ||
        value.entityId ||
        value.selectedId ||
        value.favoriteId ||
        value.voteForId ||
        value.voteFor,

      teamId:
        value.teamId ||
        value.selectedTeamId ||
        value.favoriteTeamId ||
        value.team ||
        value.selectedTeam ||
        value.votedForId ||
        value.candidateId ||
        value.nomineeId ||
        value.entityId ||
        value.selectedId ||
        value.favoriteId ||
        value.voteForId ||
        value.voteFor
    };
  }

  private showValidationError(): void {
    this.errorMessage = "Please fill out all required fields correctly.";
    this.successMessage = null;
    this.voteForm.markAllAsTouched();
  }

  private clearMessages(): void {
    this.successMessage = null;
    this.errorMessage = null;
  }
}