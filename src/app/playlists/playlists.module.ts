import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistsRoutingModule } from './playlists-routing.module';
import { PlaylistsComponent } from './playlists/playlists.component';
import { PlaylistDetalleComponent } from './playlist-detalle/playlist-detalle.component';


@NgModule({
  declarations: [
    PlaylistsComponent,
    PlaylistDetalleComponent
  ],
  imports: [
    CommonModule,
    PlaylistsRoutingModule
  ]
})
export class PlaylistsModule { }
