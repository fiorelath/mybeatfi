import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // ✅ Importamos el servicio de autenticación

export interface Cancion {
  id?: string;
  titulo: string;
  artista: string;
  genero: string;
  duracion: number;
  imagenUrl: string;
  uid?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CancionesService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {}

  // Obtener todas las canciones
  obtenerCanciones(): Observable<Cancion[]> {
    const cancionesRef = collection(this.firestore, 'canciones');
    return collectionData(cancionesRef, { idField: 'id' }) as Observable<Cancion[]>;
  }

  // Obtener una canción por ID
  obtenerCancionPorId(id: string): Observable<Cancion> {
    const cancionRef = doc(this.firestore, `canciones/${id}`);
    return docData(cancionRef, { idField: 'id' }) as Observable<Cancion>;
  }

  // Crear nueva canción
  agregarCancion(cancion: Cancion): Promise<void> {
    const cancionesRef = collection(this.firestore, 'canciones');
    const uid = this.authService.uidActual;

    if (!uid) {
      return Promise.reject('Usuario no autenticado');
    }

    const nuevaCancion = {
      ...cancion,
      uid
    };

    return addDoc(cancionesRef, nuevaCancion)
      .then(() => {
        console.log('✅ Canción agregada correctamente');
      })
      .catch((error) => {
        console.error('❌ Error al agregar canción:', error);
        throw error;
      });
  }

  // Actualizar canción existente
  actualizarCancion(id: string, cancion: Cancion): Promise<void> {
    if (!id) {
      return Promise.reject('ID de canción inválido');
    }

    const cancionRef = doc(this.firestore, `canciones/${id}`);
    const { id: _, ...datosCancion } = cancion;

    return updateDoc(cancionRef, datosCancion)
      .then(() => {
        console.log('✅ Canción actualizada correctamente');
      })
      .catch((error) => {
        console.error('❌ Error al actualizar canción:', error);
        throw error;
      });
  }

  // Eliminar canción
  eliminarCancion(id: string): Promise<void> {
    const cancionRef = doc(this.firestore, `canciones/${id}`);
    return deleteDoc(cancionRef)
      .then(() => {
        console.log('🗑️ Canción eliminada correctamente');
      })
      .catch((error) => {
        console.error('❌ Error al eliminar canción:', error);
        throw error;
      });
  }
}