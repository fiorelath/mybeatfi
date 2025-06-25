import { Component, OnInit } from '@angular/core';
import { CancionesService, Cancion } from 'src/app/servicios/canciones.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  canciones$: Observable<Cancion[]> | undefined;

  constructor(private cancionesService: CancionesService) {}

  ngOnInit(): void {
    this.canciones$ = this.cancionesService.obtenerCanciones();
  }
}
