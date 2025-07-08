import { Component, OnInit } from '@angular/core';
import { CancionesService, Cancion } from 'src/app/servicios/canciones.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  canciones$: Observable<Cancion[]> | undefined;
  uidActual: string | null = null;

  constructor(
    private cancionesService: CancionesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.canciones$ = this.cancionesService.obtenerCanciones();
    this.uidActual = this.authService.uidActual;
  }
}
