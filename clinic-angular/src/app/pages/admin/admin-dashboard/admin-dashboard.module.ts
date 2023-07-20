import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalModule } from 'ngx-bootstrap/modal';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ChartModule } from 'primeng/chart';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CalendarComponent } from './calendar/calendar.component';
import { ChartComponent } from './chart/chart.component';
import { PieComponent } from './pie/pie.component';

const UX = [TableModule, ButtonModule, DialogModule, ChartModule];

@NgModule({
  declarations: [AdminDashboardComponent, CalendarComponent, ChartComponent, PieComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    ModalModule.forRoot(),
    ...UX,
  ],
})
export class AdminDashboardModule {}
