import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionistAppointmentsComponent } from './receptionist-appointments.component';

const routes: Routes = [{ path: '', component: ReceptionistAppointmentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionistAppointmentsRoutingModule { }
