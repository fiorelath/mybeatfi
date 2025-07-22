import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistsService, Playlist } from 'src/app/servicios/playlists.service';
import { CancionesService, Cancion } from 'src/app/servicios/canciones.service';

@Component({
  selector: 'app-playlist-detalle',
  templateUrl: './playlist-detalle.component.html',
  styleUrls: ['./playlist-detalle.component.css']
})
export class PlaylistDetalleComponent implements OnInit {
  playlist!: Playlist;
  cancionesDePlaylist: Cancion[] = [];
  cargando = true;

  cancionActualIndex = 0;
  audio = new Audio();
  enReproduccion = false;

  constructor(
    private route: ActivatedRoute,
    private playlistsService: PlaylistsService,
    private cancionesService: CancionesService
  ) {}

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.playlistsService.obtenerPlaylistPorId(id).subscribe(playlist => {
      this.playlist = playlist;

      this.cancionesService.obtenerCanciones().subscribe(todas => {
        this.cancionesDePlaylist = todas.filter(c => playlist.canciones.includes(c.id!));
        this.cargando = false;

        if (this.cancionesDePlaylist.length > 0) {
          // Configura el evento de siguiente canción SOLO una vez
          this.audio.addEventListener('ended', () => this.siguienteCancion());
        
          
        }
      });
    });
  }
}

reproducirCancion(index: number): void {
  if (index < 0 || index >= this.cancionesDePlaylist.length) return;

  const cancion = this.cancionesDePlaylist[index];

  if (cancion && cancion.audioUrl) {
    if (this.enReproduccion) {
      this.audio.pause(); // Detenemos si hay otra
    }

    this.audio.src = cancion.audioUrl;
    this.audio.load();
    this.audio.play().then(() => {
      this.enReproduccion = true;
      this.cancionActualIndex = index;
    }).catch(err => {
      console.error("Error al reproducir:", err);
    });
  }
}

  siguienteCancion(): void {
    if (this.cancionActualIndex < this.cancionesDePlaylist.length - 1) {
      this.reproducirCancion(this.cancionActualIndex + 1);
    }
  }

  cancionAnterior(): void {
    if (this.cancionActualIndex > 0) {
      this.reproducirCancion(this.cancionActualIndex - 1);
    }
  }

  pausarOReanudar(): void {
  // Si no hay canción cargada, reproduce la primera automáticamente
  if (!this.audio.src && this.cancionesDePlaylist.length > 0) {
    this.reproducirCancion(0);
    return;
  }

  // Si ya hay una canción cargada
  if (this.enReproduccion) {
    this.audio.pause();
    this.enReproduccion = false;
  } else {
    this.audio.play().then(() => {
      this.enReproduccion = true;
    }).catch(err => {
      console.error("Error al reanudar:", err);
    });
  }
}

  ngOnDestroy(): void {
  this.audio.pause();
  this.audio.currentTime = 0;
  }

}
