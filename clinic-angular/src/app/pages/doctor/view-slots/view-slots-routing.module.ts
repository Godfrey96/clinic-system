import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewSlotsComponent } from './view-slots.component';

const routes: Routes = [{ path: '', component: ViewSlotsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewSlotsRoutingModule { }
