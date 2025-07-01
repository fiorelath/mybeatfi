import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CancionesService, Cancion } from 'src/app/servicios/canciones.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cancion-detalle',
  templateUrl: './cancion-detalle.component.html',
  styleUrls: ['./cancion-detalle.component.css']
})
export class CancionDetalleComponent implements OnInit {
  cancion$!: Observable<Cancion | undefined>;

  constructor(
    private route: ActivatedRoute,
    private cancionesService: CancionesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cancion$ = this.cancionesService.obtenerCanciones().pipe(
        map(canciones => canciones.find(c => c.id === id))
      );
    }
  }
}
