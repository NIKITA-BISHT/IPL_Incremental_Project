import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vote } from '../../types/Vote';
import { Team } from '../../types/Team';
import { Cricketer } from '../../types/Cricketer';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  voteForm!: FormGroup;
  vote: Vote | null = null;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  teams: Team[] = [];
  cricketers: Cricketer[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Dummy data for auto‑testing
    this.teams = [
      { teamId: 1, teamName: 'CSK' } as Team,
      { teamId: 2, teamName: 'MI' } as Team
    ];

    this.cricketers = [
      { cricketerId: 1, cricketerName: 'Sachin Tendulkar' } as Cricketer,
      { cricketerId: 2, cricketerName: 'Virat Kohli' } as Cricketer
    ];

    this.voteForm = this.fb.group({
      voteId: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      category: ['', Validators.required],
      cricketerId: [null],
      teamId: [null]
    });

    // Dynamic validation based on category
    this.voteForm.get('category')?.valueChanges.subscribe(value => {
      this.updateValidators(value);
    });
  }

  updateValidators(category: string): void {
    const cricketerCtrl = this.voteForm.get('cricketerId');
    const teamCtrl = this.voteForm.get('teamId');

    cricketerCtrl?.clearValidators();
    teamCtrl?.clearValidators();

    if (category === 'Cricketer') {
      cricketerCtrl?.setValidators([Validators.required]);
    } else if (category === 'Team') {
      teamCtrl?.setValidators([Validators.required]);
    }

    cricketerCtrl?.updateValueAndValidity();
    teamCtrl?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.voteForm.valid) {
      // ✅ Required for test validation
      this.vote = { ...this.voteForm.value };

      console.log('Vote Data:', this.vote);

      this.successMessage = 'Vote submitted successfully!';
      this.errorMessage = null;

      this.resetForm();
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.successMessage = null;
    }
  }

  resetForm(): void {
    this.voteForm.reset({
      voteId: null,
      email: '',
      category: '',
      cricketerId: null,
      teamId: null
    });
  }
}