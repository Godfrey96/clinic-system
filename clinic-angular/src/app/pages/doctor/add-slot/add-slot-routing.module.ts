import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSlotComponent } from './add-slot.component';

const routes: Routes = [{ path: '', component: AddSlotComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddSlotRoutingModule { }
