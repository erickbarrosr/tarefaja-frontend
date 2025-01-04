import { SignUpService } from './../../services/sign-up.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  spinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private signUpService: SignUpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinner = true;

    this.buildForms();

    this.spinner = false;
  }

  buildForms() {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.signUpForm.get(field);

    return !!(control && control.touched && control.invalid);
  }

  onFormSubmit() {
    if (this.signUpForm.valid) {
      this.spinner = true;

      const formValue = this.signUpForm.value;

      this.signUpService.signUp(formValue).subscribe(() => {
        this.router.navigate(['/login']);
      });
    }
  }
}
