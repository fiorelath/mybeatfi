export interface Cancion {
  id?: string;
  titulo: string;
  artista: string;
  genero: string;
  duracion: number;
  url: string;
  imagen: string;
  fechaPublicacion: Date;
}
