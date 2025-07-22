import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaylistsService, Playlist } from 'src/app/servicios/playlists.service';
import { CancionesService, Cancion } from 'src/app/servicios/canciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth'; // 👈 Importa esto

@Component({
  selector: 'app-playlist-form',
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.css']
})
export class PlaylistFormComponent implements OnInit {
  playlistForm: FormGroup;
  mensaje = '';
  guardando = false;
  idEnEdicion: string | null = null;

  cancionesDisponibles: Cancion[] = [];

  constructor(
    private fb: FormBuilder,
    private playlistsService: PlaylistsService,
    private cancionesService: CancionesService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: Auth,
  ) {
    this.playlistForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: [''],
      canciones: [[]] // IDs de canciones seleccionadas
    });
  }

  ngOnInit(): void {
    // Cargar todas las canciones disponibles
    this.cancionesService.obtenerCanciones().subscribe(canciones => {
      this.cancionesDisponibles = canciones;
    });

    // Si estamos en modo edición
    this.idEnEdicion = this.route.snapshot.paramMap.get('id');
    if (this.idEnEdicion) {
      this.playlistsService.obtenerPlaylistPorId(this.idEnEdicion).subscribe(playlist => {
        if (playlist) {
          this.playlistForm.patchValue({
            nombre: playlist.nombre,
            descripcion: playlist.descripcion,
            canciones: playlist.canciones || []
          });
          this.mensaje = '📝 Editando playlist';
        }
      });
    }
  }

  get nombre() {
    return this.playlistForm.get('nombre')!;
  }

  get descripcion() {
    return this.playlistForm.get('descripcion')!;
  }

  guardar() {
    if (this.playlistForm.valid) {
      this.guardando = true;
      this.mensaje = '';

      const user = this.auth.currentUser;
     if (!user) {
      this.mensaje = '❌ No hay usuario autenticado';
      this.guardando = false;
      return;
    }

      const datosPlaylist: Playlist = {
        ...this.playlistForm.value,
        uid: user.uid // 🔐 Reemplazar con UID real en la parte 4
      };

      const accion = this.idEnEdicion
        ? this.playlistsService.actualizarPlaylist(this.idEnEdicion, datosPlaylist)
        : this.playlistsService.crearPlaylist(datosPlaylist);

      accion
        .then(() => {
          this.mensaje = this.idEnEdicion
            ? '✅ Playlist actualizada correctamente'
            : '✅ Playlist creada correctamente';
          this.playlistForm.reset();
          this.router.navigate(['/playlists']);
        })
        .catch(error => {
          console.error('❌ Error al guardar playlist:', error);
          this.mensaje = '❌ Ocurrió un error al guardar';
        })
        .finally(() => this.guardando = false);
    } else {
      this.playlistForm.markAllAsTouched();
    }
  }

  // ✅ Método para manejar checkboxes
  toggleCancion(cancionId: string, event: Event) {
    const control = this.playlistForm.get('canciones');
    if (!control) return;

    const checked = (event.target as HTMLInputElement).checked;
    const cancionesActuales = control.value as string[];

    if (checked) {
      if (!cancionesActuales.includes(cancionId)) {
        control.setValue([...cancionesActuales, cancionId]);
      }
    } else {
      control.setValue(cancionesActuales.filter(id => id !== cancionId));
    }
  }
}
