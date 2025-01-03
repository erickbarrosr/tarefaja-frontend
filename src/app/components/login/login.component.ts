import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildForms();
  }

  buildForms() {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onFormSubmit() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;

      console.log(formValue);
    }
  }
}
