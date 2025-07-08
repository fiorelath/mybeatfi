import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CancionesService, Cancion } from '../../servicios/canciones.service';
import { AuthService } from 'src/app/servicios/auth.service'; // 👈 IMPORTANTE

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

  constructor(
    private fb: FormBuilder,
    private cancionesService: CancionesService,
    private route: ActivatedRoute,
    private authService: AuthService // 👈 INYECTAMOS el AuthService
  ) {
    this.cancionForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      artista: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      duracion: [null, [Validators.required, Validators.min(1), Validators.max(30)]],
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

      this.cancionesService.obtenerCancionPorId(id).subscribe((cancion: Cancion) => {
        if (cancion) {
          this.cancionForm.patchValue({
            titulo: cancion.titulo,
            artista: cancion.artista,
            duracion: cancion.duracion,
            genero: cancion.genero,
            imagenUrl: cancion.imagenUrl
          });
          this.mensaje = '📝 Editando canción';
        }
      });
    }
  }

  get titulo() { return this.cancionForm.get('titulo')!; }
  get artista() { return this.cancionForm.get('artista')!; }
  get duracion() { return this.cancionForm.get('duracion')!; }
  get genero() { return this.cancionForm.get('genero')!; }
  get imagenUrl() { return this.cancionForm.get('imagenUrl')!; }

  guardar() {
    if (this.cancionForm.valid) {
      this.guardando = true;
      this.mensaje = '';

      // Obtenemos el UID del usuario actual
      const uid = this.authService.uidActual;

      if (!uid) {
        this.mensaje = '❌ No estás autenticada. Inicia sesión para guardar canciones.';
        this.guardando = false;
        return;
      }

      const datosCancion: Cancion = {
        ...this.cancionForm.value,
        uid: uid  // 👈 Aquí agregamos el campo UID del creador
      };

      if (this.idEnEdicion) {
        // ✏️ Modo edición
        this.cancionesService.actualizarCancion(this.idEnEdicion, datosCancion)
          .then(() => {
            this.mensaje = '✅ ¡Canción actualizada exitosamente!';
            this.resetFormulario();
          })
          .catch(error => {
            console.error('Error al actualizar:', error);
            this.mensaje = '❌ Error al actualizar la canción.';
          })
          .finally(() => this.guardando = false);
      } else {
        // ➕ Modo creación
        this.cancionesService.agregarCancion(datosCancion)
          .then(() => {
            this.mensaje = '🎉 ¡Canción guardada exitosamente!';
            this.resetFormulario();
          })
          .catch(error => {
            console.error('Error al guardar:', error);
            this.mensaje = '❌ Hubo un error al guardar la canción.';
          })
          .finally(() => this.guardando = false);
      }
    } else {
      this.cancionForm.markAllAsTouched();
    }
  }

  resetFormulario() {
    this.cancionForm.reset();
    this.idEnEdicion = null;
  }
}
