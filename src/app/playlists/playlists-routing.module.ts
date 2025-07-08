import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistsComponent } from './playlists/playlists.component';
import { PlaylistDetalleComponent } from './playlist-detalle/playlist-detalle.component';
import { PlaylistFormComponent } from './playlist-form/playlist-form.component';
import { AuthGuard } from '../guards/auth.guard'; // 👈 Importar el guard

const routes: Routes = [
  {
    path: '',
    component: PlaylistsComponent,
    canActivate: [AuthGuard] // 🔒 Solo logueados
  },
  {
    path: 'nueva',
    component: PlaylistFormComponent,
    canActivate: [AuthGuard] // 🔒 Solo logueados
  },
  {
    path: 'editar/:id',
    component: PlaylistFormComponent,
    canActivate: [AuthGuard] // 🔒 Solo logueados
  },
  {
    path: 'playlist/:id',
    component: PlaylistDetalleComponent,
    canActivate: [AuthGuard] // 🔒 Solo logueados
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistsRoutingModule { }
