import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cancion-form',
  templateUrl: './cancion-form.component.html',
  styleUrls: ['./cancion-form.component.css']
})
export class CancionFormComponent {
  cancionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.cancionForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      artista: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      duracion: [null, [Validators.required, Validators.min(1), Validators.max(30)]],
      genero: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      imagenUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/i)]]
    });
  }

get titulo() { return this.cancionForm.get('titulo')!; }
get artista() { return this.cancionForm.get('artista')!; }
get duracion() { return this.cancionForm.get('duracion')!; }
get genero() { return this.cancionForm.get('genero')!; }
get imagenUrl() { return this.cancionForm.get('imagenUrl')!; }

  guardar() {
    if (this.cancionForm.valid) {
      console.log('Canción guardada:', this.cancionForm.value);
      // Aquí se puede llamar a un servicio para guardar la canción
      this.cancionForm.reset();
    } else {
      this.cancionForm.markAllAsTouched();
    }
  }
}
