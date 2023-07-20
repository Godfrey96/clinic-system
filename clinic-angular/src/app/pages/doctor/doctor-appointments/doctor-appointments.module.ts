import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorAppointmentsRoutingModule } from './doctor-appointments-routing.module';
import { DoctorAppointmentsComponent } from './doctor-appointments.component';


import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const UX = [
  TableModule,
  ButtonModule,
  DialogModule
]

@NgModule({
  declarations: [
    DoctorAppointmentsComponent
  ],
  imports: [
    CommonModule,
    DoctorAppointmentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...UX
  ]
})
export class DoctorAppointmentsModule { }
