import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
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
}
