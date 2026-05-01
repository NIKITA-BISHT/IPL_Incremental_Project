import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  registrationForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]+$')
      ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).+$')
      ]]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.successMessage = 'Registration successful!';
      this.errorMessage = '';
      this.registrationForm.reset();
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.successMessage = '';
      this.registrationForm.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.registrationForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }
}