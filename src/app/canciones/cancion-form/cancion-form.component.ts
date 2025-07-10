import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CancionesService, Cancion } from '../../servicios/canciones.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-cancion-form',
  templateUrl: './cancion-form.component.html',
  styleUrls: ['./cancion-form.component.css']
})
export class CancionFormComponent implements OnInit {
  cancionForm: FormGroup;
  guardando = false;
  mensaje = '';
  idEnEdicion: string | null = null;
  uidOriginal: string | null = null;

  constructor(
    private fb: FormBuilder,
    private cancionesService: CancionesService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.cancionForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      artista: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      minutos: [0, [Validators.required, Validators.min(0), Validators.max(30)]],
      segundos: [0, [Validators.required, Validators.min(0), Validators.max(59)]],
      genero: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      imagenUrl: ['', [
        Validators.required,
        Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/i)
      ]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idEnEdicion = id;
      this.mensaje = '📝 Editando canción';

      this.cancionesService.obtenerCancionPorId(id).subscribe((cancion: Cancion) => {
        if (cancion) {
          this.uidOriginal = cancion.uid ?? null;

          const minutos = Math.floor(cancion.duracion);
          const segundos = Math.round((cancion.duracion - minutos) * 60);

          this.cancionForm.patchValue({
            titulo: cancion.titulo,
            artista: cancion.artista,
            minutos,
            segundos,
            genero: cancion.genero,
            imagenUrl: cancion.imagenUrl
          });
        }
      });
    }
  }

  get titulo() { return this.cancionForm.get('titulo')!; }
  get artista() { return this.cancionForm.get('artista')!; }
  get minutos() { return this.cancionForm.get('minutos')!; }
  get segundos() { return this.cancionForm.get('segundos')!; }
  get genero() { return this.cancionForm.get('genero')!; }
  get imagenUrl() { return this.cancionForm.get('imagenUrl')!; }

  guardar(): void {
    if (!this.cancionForm.valid) {
      this.cancionForm.markAllAsTouched();
      this.mensaje = '❌ Por favor, corrige los errores antes de guardar.';
      return;
    }

    this.guardando = true;
    this.mensaje = '';

    const uidActual = this.authService.uidActual;
    if (!uidActual) {
      this.mensaje = '❌ No estás autenticada. Inicia sesión para guardar canciones.';
      this.guardando = false;
      return;
    }

    const minutos = this.cancionForm.value.minutos;
    const segundos = this.cancionForm.value.segundos;
    const duracion = +(minutos + segundos / 60).toFixed(2); // Ej: 3 + 30/60 = 3.50

    const datosCancion: Cancion = {
      titulo: this.cancionForm.value.titulo,
      artista: this.cancionForm.value.artista,
      duracion,
      genero: this.cancionForm.value.genero,
      imagenUrl: this.cancionForm.value.imagenUrl,
      uid: this.idEnEdicion ? this.uidOriginal ?? uidActual : uidActual
    };

    const accion = this.idEnEdicion
      ? this.cancionesService.actualizarCancion(this.idEnEdicion, datosCancion)
      : this.cancionesService.agregarCancion(datosCancion);

    accion
      .then(() => {
        this.mensaje = this.idEnEdicion
          ? '✅ ¡Canción actualizada exitosamente!'
          : '🎉 ¡Canción guardada exitosamente!';
        if (!this.idEnEdicion) this.resetFormulario();
      })
      .catch(error => {
        console.error('❌ Error:', error);
        this.mensaje = '❌ Ocurrió un error al guardar.';
      })
      .finally(() => this.guardando = false);
  }

  resetFormulario(): void {
    this.cancionForm.reset();
    if (!this.idEnEdicion) {
      this.idEnEdicion = null;
    }
  }
}
