import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistsComponent } from './playlists/playlists.component';
import { PlaylistDetalleComponent } from './playlist-detalle/playlist-detalle.component';

const routes: Routes = [
  { path: '', component: PlaylistsComponent },
  { path: 'playlist/:id', component: PlaylistDetalleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistsRoutingModule { }
