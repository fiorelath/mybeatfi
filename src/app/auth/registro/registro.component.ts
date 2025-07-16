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

  mostrarPassword = false;
  mostrarConfirmacion = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', [Validators.required]]
    }, { validator: this.verificarCoincidencia });
  }

  // ✅ Getters
  get email() {
    return this.registroForm.get('email');
  }

  get password() {
    return this.registroForm.get('password');
  }

  get confirmarPassword() {
    return this.registroForm.get('confirmarPassword');
  }

  // ✅ Verifica que las contraseñas coincidan
  verificarCoincidencia(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmarPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
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
          this.mensaje = '❌ ' + (error.code ? this.traducirError(error.code) : 'Error inesperado.');
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
