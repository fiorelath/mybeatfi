import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CancionesService, Cancion } from 'src/app/servicios/canciones.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cancion-detalle',
  templateUrl: './cancion-detalle.component.html',
  styleUrls: ['./cancion-detalle.component.css']
})
export class CancionDetalleComponent implements OnInit {
  cancion$!: Observable<Cancion>;
  cancionId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cancionesService: CancionesService
  ) {}

  ngOnInit(): void {
    this.cancionId = this.route.snapshot.paramMap.get('id');
    if (this.cancionId) {
      this.cancion$ = this.cancionesService.obtenerCancionPorId(this.cancionId);
    }
  }

  eliminar(): void {
    if (this.cancionId) {
      const confirmar = confirm('¿Estás segura de que deseas eliminar esta canción?');
      if (confirmar) {
        this.cancionesService.eliminarCancion(this.cancionId)
          .then(() => {
            alert('✅ Canción eliminada correctamente');
            this.router.navigate(['/home']);
          })
          .catch(error => {
            console.error('❌ Error al eliminar canción:', error);
            alert('❌ Ocurrió un error al eliminar la canción');
          });
      }
    }
  }
}
