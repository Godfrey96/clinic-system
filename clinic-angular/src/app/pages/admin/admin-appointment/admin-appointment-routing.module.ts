import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAppointmentComponent } from './admin-appointment.component';

const routes: Routes = [{ path: '', component: AdminAppointmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAppointmentRoutingModule { }
