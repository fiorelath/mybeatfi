import { Component, OnInit } from '@angular/core';
import { CancionesService, Cancion } from 'src/app/servicios/canciones.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cancionesOriginales: Cancion[] = [];
  cancionesFiltradas: Cancion[] = [];
  uidActual: string | null = null;

  // 🔎 Filtros
  terminoBusqueda: string = '';
  filtroArtista: string = '';
  filtroGenero: string = '';
  artistasUnicos: string[] = [];
  generosUnicos: string[] = [];

  // 🔽 Ordenamiento
  ordenSeleccionado: string = '';

  constructor(
    private cancionesService: CancionesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.uidActual = this.authService.uidActual;

    this.cancionesService.obtenerCanciones().subscribe(canciones => {
      this.cancionesOriginales = canciones;
      this.actualizarOpcionesUnicas();
      this.aplicarFiltros();
    });
  }

  editarCancion(id: string): void {
    this.router.navigate(['/home/editar', id]);
  }

  eliminarCancion(id: string): void {
    if (!this.uidActual) {
      alert('❌ No tienes permiso para eliminar esta canción.');
      return;
    }

    if (confirm('¿Estás segura de que deseas eliminar esta canción?')) {
      this.cancionesService.eliminarCancion(id)
        .then(() => {
          alert('✅ Canción eliminada correctamente');
        })
        .catch((error) => {
          console.error('❌ Error al eliminar canción:', error);
          alert('❌ No se pudo eliminar la canción');
        });
    }
  }

  actualizarOpcionesUnicas(): void {
    this.artistasUnicos = [...new Set(this.cancionesOriginales.map(c => c.artista))];
    this.generosUnicos = [...new Set(this.cancionesOriginales.map(c => c.genero))];
  }

  aplicarFiltros(): void {
    const termino = this.terminoBusqueda.toLowerCase().trim();

    let resultado = this.cancionesOriginales.filter(c =>
      (c.titulo.toLowerCase().includes(termino) ||
       c.artista.toLowerCase().includes(termino) ||
       c.genero.toLowerCase().includes(termino)) &&
      (this.filtroArtista ? c.artista === this.filtroArtista : true) &&
      (this.filtroGenero ? c.genero === this.filtroGenero : true)
    );

    // 🔽 Aplicar ordenamiento
    switch (this.ordenSeleccionado) {
      case 'titulo':
        resultado.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case 'artista':
        resultado.sort((a, b) => a.artista.localeCompare(b.artista));
        break;
      case 'duracion':
        resultado.sort((a, b) => a.duracion - b.duracion);
        break;
    }

    this.cancionesFiltradas = resultado;
  }

  onFiltroChange(): void {
    this.aplicarFiltros();
  }
}
