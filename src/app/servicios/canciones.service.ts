import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Cancion {
  id?: string;
  titulo: string;
  artista: string;
  genero: string;
  duracion: number;
  imagenUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CancionesService {

  constructor(private firestore: Firestore) {}

  //  Obtener todas las canciones
  obtenerCanciones(): Observable<Cancion[]> {
    const cancionesRef = collection(this.firestore, 'canciones');
    return collectionData(cancionesRef, { idField: 'id' }) as Observable<Cancion[]>;
  }

  //  Obtener una canción por ID
  obtenerCancionPorId(id: string): Observable<Cancion> {
    const cancionRef = doc(this.firestore, `canciones/${id}`);
    return docData(cancionRef, { idField: 'id' }) as Observable<Cancion>;
  }

  // Crear una nueva canción
  agregarCancion(cancion: Cancion): Promise<void> {
    const cancionesRef = collection(this.firestore, 'canciones');
    return addDoc(cancionesRef, cancion).then(() => {
      console.log('✅ Canción agregada correctamente');
    }).catch((error) => {
      console.error('❌ Error al agregar canción:', error);
      throw error;
    });
  }
}
