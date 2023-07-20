import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorPatientsRoutingModule } from './doctor-patients-routing.module';
import { DoctorPatientsComponent } from './doctor-patients.component';

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
    DoctorPatientsComponent
  ],
  imports: [
    CommonModule,
    DoctorPatientsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...UX

  ]

})
export class DoctorPatientsModule { }
