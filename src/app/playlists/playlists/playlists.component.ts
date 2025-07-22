import { Component, OnInit } from '@angular/core';
import { PlaylistsService, Playlist } from 'src/app/servicios/playlists.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  playlists$!: Observable<Playlist[]>;

  constructor(private playlistsService: PlaylistsService) {}

  ngOnInit(): void {
    this.playlists$ = this.playlistsService.obtenerPlaylistsDelUsuario();
  }

  eliminarPlaylist(id: string | undefined): void {
    if (!id) return;

    const confirmacion = confirm('¿Estás seguro de eliminar esta playlist?');
    if (confirmacion) {
      this.playlistsService.eliminarPlaylist(id)
        .then(() => console.log(' Playlist eliminada'))
        .catch(err => console.error(' Error al eliminar playlist', err));
    }
  }
}
