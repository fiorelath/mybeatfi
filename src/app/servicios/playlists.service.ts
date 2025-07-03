import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
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

  // Obtener todas las playlists
  obtenerPlaylists(): Observable<Playlist[]> {
    const playlistsRef = collection(this.firestore, 'playlists');
    return collectionData(playlistsRef, { idField: 'id' }) as Observable<Playlist[]>;
  }

  // Crear una nueva playlist
  crearPlaylist(playlist: Playlist): Promise<void> {
    const playlistsRef = collection(this.firestore, 'playlists');
    const { id, ...data } = playlist;
    return addDoc(playlistsRef, data).then(() => {
      console.log('✅ Playlist creada correctamente');
    });
  }

  // Obtener una playlist por ID
  obtenerPlaylistPorId(id: string): Observable<Playlist> {
    const ref = doc(this.firestore, `playlists/${id}`);
    return docData(ref, { idField: 'id' }) as Observable<Playlist>;
  }

  // Actualizar una playlist
  actualizarPlaylist(id: string, playlist: Playlist): Promise<void> {
    const ref = doc(this.firestore, `playlists/${id}`);
    const { id: _, ...data } = playlist;
    return updateDoc(ref, data);
  }

  // Eliminar una playlist
  eliminarPlaylist(id: string): Promise<void> {
    const ref = doc(this.firestore, `playlists/${id}`);
    return deleteDoc(ref);
  }
}
