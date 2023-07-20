import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorDashboardRoutingModule } from './doctor-dashboard-routing.module';
import { DoctorDashboardComponent } from './doctor-dashboard.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarAppointmentComponent } from './calendar-appointment/calendar-appointment.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

const UX = [TableModule, ButtonModule, DialogModule, ConfirmDialogModule];
@NgModule({
  declarations: [DoctorDashboardComponent, CalendarAppointmentComponent],
  imports: [
    CommonModule,
    DoctorDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    ModalModule.forRoot(),
    ...UX,
  ],
})
export class DoctorDashboardModule {}
