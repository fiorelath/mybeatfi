import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CancionesService, Cancion } from 'src/app/servicios/canciones.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-cancion-detalle',
  templateUrl: './cancion-detalle.component.html',
  styleUrls: ['./cancion-detalle.component.css']
})
export class CancionDetalleComponent implements OnInit {
  cancion: Cancion | null = null;
  cancionId: string | null = null;
  uidActual: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cancionesService: CancionesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.uidActual = this.authService.uidActual;

    this.cancionId = this.route.snapshot.paramMap.get('id');
    if (this.cancionId) {
      this.cancionesService.obtenerCancionPorId(this.cancionId).subscribe(cancion => {
        this.cancion = cancion;
      });
    }
  }

  eliminar(): void {
    if (!this.uidActual || this.uidActual !== this.cancion?.uid) {
      alert('❌ No tienes permiso para eliminar esta canción.');
      return;
    }

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
