import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddSlotRoutingModule } from './add-slot-routing.module';
import { AddSlotComponent } from './add-slot.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddSlotComponent
  ],
  imports: [
    CommonModule,
    AddSlotRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddSlotModule { }
