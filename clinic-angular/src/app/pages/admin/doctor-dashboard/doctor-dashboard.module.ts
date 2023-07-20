import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorDashboardRoutingModule } from './doctor-dashboard-routing.module';
import { DoctorDashboardComponent } from './doctor-dashboard.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';


const UX = [TableModule, ButtonModule, DialogModule];

@NgModule({
  declarations: [DoctorDashboardComponent, AddDoctorComponent],
  imports: [
    CommonModule,
    DoctorDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...UX,
  ],
})
export class DoctorDashboardModule {}
