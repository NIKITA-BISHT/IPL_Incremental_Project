import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { IplService } from "../../services/ipl.service";
import { Team } from "../../types/Team";

@Component({
  selector: "app-team-edit",
  templateUrl: "./teamedit.component.html",
  styleUrls: ["./teamedit.component.scss"]
})
export class TeamEditComponent {
  teamForm: FormGroup;
  teamId: number | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private iplService: IplService
  ) {
    this.teamForm = this.formBuilder.group({
      teamName: ["", Validators.required],
      location: ["", Validators.required],
      ownerName: ["", Validators.required],
      establishmentYear: ["", Validators.required]
    });
  }

  loadTeamDetails(teamId: number): void {
    this.teamId = teamId;

    this.iplService.getTeamById(teamId).subscribe({
      next: (team: Team) => {
        this.teamForm.patchValue({
          teamName: team.teamName,
          location: team.location,
          ownerName: team.ownerName,
          establishmentYear: team.establishmentYear
        });
      },
      error: () => {
        this.errorMessage = "Unable to load team details.";
      }
    });
  }

  onSubmit(): void {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.teamForm.invalid) {
      this.errorMessage = "Please fill out all required fields correctly.";
      this.teamForm.markAllAsTouched();
      return;
    }

    const value = this.teamForm.value;

    const updatedTeam = new Team(
      this.teamId || 0,
      value.teamName,
      value.location,
      value.ownerName,
      value.establishmentYear
    );

    this.iplService.updateTeam(updatedTeam).subscribe({
      next: () => {
        this.successMessage = "Team updated successfully!";
        this.errorMessage = null;
      },
      error: () => {
        this.errorMessage = "Unable to update team.";
        this.successMessage = null;
      }
    });
  }
}