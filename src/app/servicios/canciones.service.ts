import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
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

  obtenerCanciones(): Observable<Cancion[]> {
    const cancionesRef = collection(this.firestore, 'canciones');
    return collectionData(cancionesRef, { idField: 'id' }) as Observable<Cancion[]>;
  }

  // 🔍 Este método es nuevo y necesario para el detalle
  obtenerCancionPorId(id: string): Observable<Cancion> {
    const cancionRef = doc(this.firestore, `canciones/${id}`);
    return docData(cancionRef, { idField: 'id' }) as Observable<Cancion>;
  }
}
