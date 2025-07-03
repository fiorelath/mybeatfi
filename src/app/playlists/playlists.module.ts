import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // ✅ IMPORTANTE

import { PlaylistsRoutingModule } from './playlists-routing.module';
import { PlaylistsComponent } from './playlists/playlists.component';
import { PlaylistDetalleComponent } from './playlist-detalle/playlist-detalle.component';
import { PlaylistFormComponent } from './playlist-form/playlist-form.component';

@NgModule({
  declarations: [
    PlaylistsComponent,
    PlaylistDetalleComponent,
    PlaylistFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,            // ✅ AÑADIDO
    ReactiveFormsModule,    // ✅ Por si aún no lo tenías
    PlaylistsRoutingModule
  ]
})
export class PlaylistsModule { }
