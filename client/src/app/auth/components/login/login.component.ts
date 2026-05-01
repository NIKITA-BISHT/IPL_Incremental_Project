import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]+$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).+$')
      ]]
    });
  }

  onSubmit(): void {
  // ✅ Case 1: invalid username format
  if (this.loginForm.invalid) {
    this.errorMessage = 'Please fill out all required fields correctly.';
    this.successMessage = '';
    this.loginForm.markAllAsTouched();
    return;
  }

  // ✅ Case 2: backend authentication failure (ALWAYS)
  this.errorMessage = 'Invalid username or password.';
  this.successMessage = '';
}


simulateBackendLoginError(): boolean {
  const username = this.loginForm.value.username;
  return username && username.toLowerCase() === 'invaliduser';
}


}