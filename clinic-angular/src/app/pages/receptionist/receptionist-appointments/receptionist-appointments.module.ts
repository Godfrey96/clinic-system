import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionistAppointmentsRoutingModule } from './receptionist-appointments-routing.module';
import { ReceptionistAppointmentsComponent } from './receptionist-appointments.component';



import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const UX = [
  TableModule,
  ButtonModule,
  DialogModule,
  DropdownModule
]

@NgModule({
  declarations: [
    ReceptionistAppointmentsComponent
  ],
  imports: [
    CommonModule,
    ReceptionistAppointmentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...UX
  ]
})
export class ReceptionistAppointmentsModule { }
