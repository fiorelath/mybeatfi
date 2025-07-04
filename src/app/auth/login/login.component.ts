import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  error = '';
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ingresar() {
    if (this.loginForm.invalid) return;

    this.cargando = true;
    this.error = '';

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password)
      .then(() => this.router.navigate(['/']))
      .catch(err => this.error = '❌ Credenciales incorrectas o error al ingresar')
      .finally(() => this.cargando = false);
  }
}
