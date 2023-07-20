import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionDoctorsComponent } from './reception-doctors.component';

const routes: Routes = [{ path: '', component: ReceptionDoctorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionDoctorsRoutingModule { }
