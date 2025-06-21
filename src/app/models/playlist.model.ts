export interface Playlist {
  id?: string;
  nombre: string;
  descripcion: string;
  canciones: string[];       // IDs de canciones
  usuarioId: string;
  fechaCreacion: Date;
}
