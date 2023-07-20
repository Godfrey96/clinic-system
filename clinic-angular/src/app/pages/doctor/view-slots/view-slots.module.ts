import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewSlotsRoutingModule } from './view-slots-routing.module';
import { ViewSlotsComponent } from './view-slots.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

const UX = [
  TableModule,
  ButtonModule,
  DialogModule
]

@NgModule({
  declarations: [
    ViewSlotsComponent
  ],
  imports: [
    CommonModule,
    ViewSlotsRoutingModule,
    ...UX
  ]
})
export class ViewSlotsModule { }
