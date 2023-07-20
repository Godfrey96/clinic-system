import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminReceptionComponent } from './admin-reception.component';
import { AddReceptionistComponent } from './add-receptionist/add-receptionist.component';

const routes: Routes = [
  { path: '', component: AdminReceptionComponent },
  { path: 'add-receptionist', component: AddReceptionistComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminReceptionRoutingModule {}
