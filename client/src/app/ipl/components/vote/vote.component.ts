import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vote } from '../../types/Vote';
import { Team } from '../../types/Team';
import { Cricketer } from '../../types/Cricketer';
import { IplService } from '../../services/ipl.service';

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

  constructor(
    private fb: FormBuilder,
    private iplService: IplService
  ) {}

  ngOnInit(): void {
    this.voteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      category: ['', Validators.required],
      cricketerId: [''],
      teamId: ['']
    });

    this.loadTeams();
    this.loadCricketers();

    this.voteForm.get('category')?.valueChanges.subscribe((category) => {
      this.updateValidators(category);
    });
  }

  loadTeams(): void {
    this.iplService.getAllTeams().subscribe({
      next: (data: Team[]) => {
        this.teams = data;
      },
      error: () => {
        this.teams = [];
      }
    });
  }

  loadCricketers(): void {
    this.iplService.getAllCricketers().subscribe({
      next: (data: Cricketer[]) => {
        this.cricketers = data;
      },
      error: () => {
        this.cricketers = [];
      }
    });
  }

  updateValidators(category: string): void {
    const cricketerControl = this.voteForm.get('cricketerId');
    const teamControl = this.voteForm.get('teamId');

    cricketerControl?.clearValidators();
    teamControl?.clearValidators();

    if (category === 'Team') {
      teamControl?.setValidators([Validators.required]);
      cricketerControl?.setValue('');
    } else if (
      category === 'Batsman' ||
      category === 'Bowler' ||
      category === 'All-rounder' ||
      category === 'Wicketkeeper'
    ) {
      cricketerControl?.setValidators([Validators.required]);
      teamControl?.setValue('');
    } else {
      cricketerControl?.setValue('');
      teamControl?.setValue('');
    }

    cricketerControl?.updateValueAndValidity();
    teamControl?.updateValueAndValidity();
  }

  onSubmit(): void {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.voteForm.invalid) {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.voteForm.markAllAsTouched();
      return;
    }

    const value = this.voteForm.value;

    let cricketerId: number | null = null;
    let teamId: number | null = null;

    if (value.category === 'Team') {
      teamId = Number(value.teamId);
      cricketerId = null;
    } else {
      cricketerId = Number(value.cricketerId);
      teamId = null;
    }

    this.vote = new Vote(
      0,
      value.email,
      value.category,
      cricketerId || 0,
      teamId || 0
    );

    this.vote.cricketerId = cricketerId;
    this.vote.teamId = teamId;

    console.log('Vote Payload:', this.vote);

    this.iplService.createVote(this.vote).subscribe({
      next: () => {
        this.resetForm();
        this.successMessage = 'Vote submitted successfully!';
        this.errorMessage = null;
      },
      error: (error) => {
        console.log('Vote Error:', error);
        this.errorMessage = 'Failed to submit vote. Please try again.';
        this.successMessage = null;
      }
    });
  }

  resetForm(): void {
    this.voteForm.reset({
      email: '',
      category: '',
      cricketerId: '',
      teamId: ''
    });

    this.vote = null;
    this.errorMessage = null;
  }
}