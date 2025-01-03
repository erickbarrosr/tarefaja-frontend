import { SignUpService } from './../../services/sign-up.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  spinner: boolean = false;

  constructor(private fb: FormBuilder, private signUpService: SignUpService) {}

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

  onFormSubmit() {
    if (this.signUpForm.valid) {
      this.spinner = true;

      const formValue = this.signUpForm.value;

      this.signUpService.signUp(formValue).subscribe(() => {
        console.log('Usuário cadastrado com sucesso!');
      });
    }
  }
}
