import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  mensaje: string = '';
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.registroForm.get('email');
  }

  get password() {
    return this.registroForm.get('password');
  }

  registrar() {
    if (this.registroForm.valid) {
      this.cargando = true;
      this.mensaje = '';
      const { email, password } = this.registroForm.value;

      this.authService.registrar(email, password)
        .then(() => {
          this.mensaje = '✅ Registro exitoso';
          this.router.navigate(['/']);
        })
        .catch(error => {
          console.error(error);
          this.mensaje = '❌ ' + (error.code ? this.traducirError(error.code) : 'Error inesperado. Verifica tu conexión o intenta más tarde.');
        })
        .finally(() => {
          this.cargando = false;
        });
    } else {
      this.registroForm.markAllAsTouched();
    }
  }

  traducirError(codigo: string): string {
    switch (codigo) {
      case 'auth/email-already-in-use':
        return 'El correo ya está en uso.';
      case 'auth/invalid-email':
        return 'Correo inválido.';
      case 'auth/weak-password':
        return 'La contraseña es muy débil.';
      default:
        return 'Error desconocido.';
    }
  }
}
