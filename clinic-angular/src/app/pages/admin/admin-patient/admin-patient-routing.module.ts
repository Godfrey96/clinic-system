import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPatientComponent } from './admin-patient.component';
import { ApmodalComponent } from './apmodal/apmodal.component';

const routes: Routes = [
  { path: '', component: AdminPatientComponent },
  { path: '', component: ApmodalComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPatientRoutingModule {}
