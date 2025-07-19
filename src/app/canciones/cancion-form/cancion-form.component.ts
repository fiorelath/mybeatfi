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
  mostrarToaster = false;
  idEnEdicion: string | null = null;
  uidOriginal: string | null = null;
  imagenPreview: string = '';

  cloudName = 'dy4wbvkbv';
  uploadPreset = 'misubida';

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
      audioUrl: ['', [Validators.required]],
      imagenUrl: ['', [Validators.required]]
    });

    this.cancionForm.get('imagenUrl')?.valueChanges.subscribe(valor => {
      this.imagenPreview = valor;
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idEnEdicion = id;
      this.mensaje = 'Editando canción';

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
            imagenUrl: cancion.imagenUrl,
            audioUrl: cancion.audioUrl
          });

          this.imagenPreview = cancion.imagenUrl;
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
  get audioUrl() { return this.cancionForm.get('audioUrl')!; }

  async subirArchivo(event: any, tipo: 'imagen' | 'audio') {
    const archivo = event.target.files[0];
    if (!archivo) return;

    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('upload_preset', this.uploadPreset);

    const url = tipo === 'imagen'
      ? `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`
      : `https://api.cloudinary.com/v1_1/${this.cloudName}/video/upload`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (tipo === 'imagen') {
        this.cancionForm.patchValue({ imagenUrl: data.secure_url });
        this.imagenPreview = data.secure_url;
      } else {
        this.cancionForm.patchValue({ audioUrl: data.secure_url });
      }

      this.mostrarMensaje(`✅ ${tipo === 'imagen' ? 'Imagen' : 'Audio'} subido con éxito`);
    } catch (error) {
      console.error(`Error subiendo ${tipo}:`, error);
      this.mostrarMensaje(`❌ Error al subir ${tipo}`);
    }
  }

  guardar(): void {
    if (!this.cancionForm.valid) {
      this.cancionForm.markAllAsTouched();
      this.mostrarMensaje('❌ Corrige los errores antes de guardar.');
      return;
    }

    this.guardando = true;

    const uidActual = this.authService.uidActual;
    if (!uidActual) {
      this.mostrarMensaje('❌ Debes iniciar sesión para guardar canciones.');
      this.guardando = false;
      return;
    }

    const minutos = this.cancionForm.value.minutos;
    const segundos = this.cancionForm.value.segundos;
    const duracion = +(minutos + segundos / 60).toFixed(2);

    const datosCancion: Cancion = {
      titulo: this.cancionForm.value.titulo,
      artista: this.cancionForm.value.artista,
      duracion,
      genero: this.cancionForm.value.genero,
      imagenUrl: this.cancionForm.value.imagenUrl,
      audioUrl: this.cancionForm.value.audioUrl,
      uid: this.idEnEdicion ? this.uidOriginal ?? uidActual : uidActual
    };

    const accion = this.idEnEdicion
      ? this.cancionesService.actualizarCancion(this.idEnEdicion, datosCancion)
      : this.cancionesService.agregarCancion(datosCancion);

    accion
      .then(() => {
        const mensajeExito = this.idEnEdicion
          ? '✅ ¡Canción actualizada correctamente!'
          : '🎉 ¡Canción guardada exitosamente!';
        this.mostrarMensaje(mensajeExito);
        if (!this.idEnEdicion) this.resetFormulario();
      })
      .catch(error => {
        console.error('❌ Error al guardar canción:', error);
        this.mostrarMensaje('❌ Ocurrió un error al guardar.');
      })
      .finally(() => this.guardando = false);
  }

  resetFormulario(): void {
    this.cancionForm.reset();
    this.imagenPreview = '';
    if (!this.idEnEdicion) {
      this.idEnEdicion = null;
    }
  }

  mostrarMensaje(texto: string): void {
    this.mensaje = texto;
    this.mostrarToaster = true;
    setTimeout(() => {
      this.mostrarToaster = false;
    }, 3000);
  }
}
