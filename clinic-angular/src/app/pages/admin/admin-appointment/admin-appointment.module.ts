import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAppointmentRoutingModule } from './admin-appointment-routing.module';
import { AdminAppointmentComponent } from './admin-appointment.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';

const UX = [TableModule, ButtonModule, DialogModule];

@NgModule({
  declarations: [AdminAppointmentComponent],
  imports: [
    CommonModule,
    AdminAppointmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    DropdownModule,
    SliderModule,
    TagModule,
    ProgressBarModule,
    ...UX,
  ],
})
export class AdminAppointmentModule {}
