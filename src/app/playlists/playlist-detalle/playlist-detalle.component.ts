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

        // Obtener todas las canciones para filtrar las que están en esta playlist
        this.cancionesService.obtenerCanciones().subscribe(todas => {
          this.cancionesDePlaylist = todas.filter(c => playlist.canciones.includes(c.id!));
          this.cargando = false;
        });
      });
    }
  }
}
