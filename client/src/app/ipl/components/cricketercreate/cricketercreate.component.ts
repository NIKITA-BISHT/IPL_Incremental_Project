import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cricketer } from '../../types/Cricketer';

@Component({
  selector: 'app-cricketer-create',
  templateUrl: './cricketercreate.component.html',
  styleUrls: ['./cricketercreate.component.scss']
})
export class CricketerCreateComponent {

  cricketerForm: FormGroup;
  successMessage = '';
  errorMessage = '';


  cricketer: Cricketer | null = null;

  constructor(private fb: FormBuilder) {
    
    this.cricketerForm = this.fb.group({
      cricketerId: [null, Validators.required],
      teamId: [null, Validators.required],
      cricketerName: ['', Validators.required],
      age: [null, Validators.required],
      nationality: ['', Validators.required],
     experience: [0, [Validators.required, Validators.min(0)]],
      role: ['', Validators.required],
      totalRuns: [null, Validators.required],
      totalWickets: [null, Validators.required]
    });

     this.cricketerForm.get('experience')?.updateValueAndValidity();
  }

  

  onSubmit(): void {
    if (this.cricketerForm.valid) {
      const v = this.cricketerForm.value;

      this.cricketer = new Cricketer(
        v.cricketerId,
        v.teamId,
        v.cricketerName,
        v.age,
        v.nationality,
        v.experience,
        v.role,
        v.totalRuns,
        v.totalWickets
      );

      console.log(this.cricketerForm.value);

      
      this.successMessage = 'Cricketer created successfully!';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please fill all required fields';
      this.successMessage = '';
      this.cricketerForm.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.cricketerForm.reset({
      cricketerId: null,
      teamId: null,
      cricketerName: '',
      age: null,
      nationality: '',
      experience: null,
      role: '',
      totalRuns: null,
      totalWickets: null
    });

    this.cricketer = null;
    this.successMessage = '';
    this.errorMessage = '';
  }
}