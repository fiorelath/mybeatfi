import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 

import { CancionesRoutingModule } from './canciones-routing.module';
import { HomeComponent } from './home/home.component';
import { CancionDetalleComponent } from './cancion-detalle/cancion-detalle.component';
import { CancionFormComponent } from './cancion-form/cancion-form.component';

@NgModule({
  declarations: [
    HomeComponent,
    CancionDetalleComponent,
    CancionFormComponent
  ],
  imports: [
    CommonModule,
    CancionesRoutingModule,
    ReactiveFormsModule 
  ]
})
export class CancionesModule { }
