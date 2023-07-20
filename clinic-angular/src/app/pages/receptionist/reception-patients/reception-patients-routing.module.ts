import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionPatientsComponent } from './reception-patients.component';

const routes: Routes = [{ path: '', component: ReceptionPatientsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionPatientsRoutingModule { }
