import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm!: FormGroup;
  spinner: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.spinner = true;

    this.buildForms();

    this.spinner = false;
  }

  buildForms() {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.touched && control.invalid);
  }

  onFormSubmit() {
    if (!this.loginForm.valid) return;
  }
}
