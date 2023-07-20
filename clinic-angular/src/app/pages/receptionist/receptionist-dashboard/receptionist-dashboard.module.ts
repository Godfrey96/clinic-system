import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionistDashboardRoutingModule } from './receptionist-dashboard-routing.module';
import { ReceptionistDashboardComponent } from './receptionist-dashboard.component';
import { ReceptionistCalendarComponent } from './receptionist-calendar/receptionist-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const UX = [TableModule, ButtonModule, DialogModule];

@NgModule({
  declarations: [
    ReceptionistDashboardComponent,
    ReceptionistCalendarComponent
  ],
  imports: [
    CommonModule,
    ReceptionistDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    ModalModule.forRoot(),
    ...UX,
  ],

})
export class ReceptionistDashboardModule { }
