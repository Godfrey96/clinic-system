import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorPatientsComponent } from './doctor-patients.component';

const routes: Routes = [{ path: '', component: DoctorPatientsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorPatientsRoutingModule { }
