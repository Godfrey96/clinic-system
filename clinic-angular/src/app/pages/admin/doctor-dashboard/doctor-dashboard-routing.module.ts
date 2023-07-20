import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './doctor-dashboard.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';

const routes: Routes = [
  { path: '', component: DoctorDashboardComponent },
  { path: 'add-doctor', component: AddDoctorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorDashboardRoutingModule { }
