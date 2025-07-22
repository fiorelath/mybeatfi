import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc, query, where } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable, of, switchMap } from 'rxjs';

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

  private firestore = inject(Firestore);
  private auth = inject(Auth);

  // ✅ Obtener solo las playlists del usuario logueado
  obtenerPlaylistsDelUsuario(): Observable<Playlist[]> {
    return new Observable<Playlist[]>((observer) => {
      const unsubscribe = this.auth.onAuthStateChanged(async (user) => {
        if (user) {
          const playlistsRef = collection(this.firestore, 'playlists');
          const q = query(playlistsRef, where('uid', '==', user.uid));
          collectionData(q, { idField: 'id' }).subscribe((data) => {
            observer.next(data as Playlist[]);
          });
        } else {
          observer.next([]); // Si no hay usuario, retornar vacío
        }
      });
      return { unsubscribe };
    });
  }

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
