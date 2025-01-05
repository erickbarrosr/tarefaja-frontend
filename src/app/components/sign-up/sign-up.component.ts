import { SignUpService } from './../../services/sign-up.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.spinner = true;

    this.buildForms();

    this.spinner = false;
  }

  buildForms() {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.signUpForm.get(field);

    return !!(control && control.touched && control.invalid);
  }

  resetForm() {}

  onFormSubmit() {
    if (this.signUpForm.invalid) return;

    this.spinner = true;

    this.signUpService.signUp(this.signUpForm.value).subscribe({
      next: (response) => {
        const message = response.message || 'Cadastro realizado com sucesso!';

        this.toastr.success(message, 'Sucesso');

        this.spinner = false;
      },

      error: (err) => {
        const errorMessage =
          err.error?.message || 'Ocorreu um erro inesperado!';

        this.toastr.error(errorMessage, 'Erro');

        this.spinner = false;
      },

      complete: () => {
        this.signUpForm.reset();

        this.router.navigate(['/login']);
      },
    });
  }
}
