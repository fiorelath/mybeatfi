import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CancionDetalleComponent } from './cancion-detalle/cancion-detalle.component';
import { CancionFormComponent } from './cancion-form/cancion-form.component';
import { AuthGuard } from '../guards/auth.guard'; // ✅ Importar el guardia

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cancion/:id', component: CancionDetalleComponent },
  { path: 'nueva', component: CancionFormComponent, canActivate: [AuthGuard] }, // ✅ Protegido
  { path: 'editar/:id', component: CancionFormComponent, canActivate: [AuthGuard] } // ✅ Protegido
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancionesRoutingModule { }
