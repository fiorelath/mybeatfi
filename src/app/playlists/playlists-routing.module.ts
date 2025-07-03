import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistsComponent } from './playlists/playlists.component';
import { PlaylistDetalleComponent } from './playlist-detalle/playlist-detalle.component';
import { PlaylistFormComponent } from './playlist-form/playlist-form.component';

const routes: Routes = [
  { path: '', component: PlaylistsComponent },
  { path: 'nueva', component: PlaylistFormComponent },         // ✅ Agregada
  { path: 'editar/:id', component: PlaylistFormComponent },    // ✅ Ya estaba bien
  { path: 'playlist/:id', component: PlaylistDetalleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistsRoutingModule { }
