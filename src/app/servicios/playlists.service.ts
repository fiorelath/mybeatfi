import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Playlist {
  id?: string;
  nombre: string;
  descripcion: string;
  canciones: string[]; // IDs de canciones
  uid: string; // ID del usuario que la creó
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  constructor(private firestore: Firestore) {}

  obtenerPlaylists(): Observable<Playlist[]> {
    const playlistsRef = collection(this.firestore, 'playlists');
    return collectionData(playlistsRef, { idField: 'id' }) as Observable<Playlist[]>;
  }
}
