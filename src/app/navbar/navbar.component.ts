import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  usuario$ = this.authService.usuarioActual$;

  // ✅ Control del menú responsive
  sidebarAbierto = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleSidebar() {
    this.sidebarAbierto = !this.sidebarAbierto;
  }

  logout() {
    this.authService.logout().then(() => {
      this.sidebarAbierto = false; // cierra sidebar al cerrar sesión
      this.router.navigate(['/login']);
    });
  }

  // ✅ Opcional: cerrar menú si se cambia de tamaño a pantalla grande
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth >= 768) {
      this.sidebarAbierto = false;
    }
  }
}
