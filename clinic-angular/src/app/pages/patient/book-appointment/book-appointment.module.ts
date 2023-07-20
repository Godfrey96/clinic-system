import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookAppointmentComponent } from './book-appointment.component';
import { BookAppointmentRoutingModule } from './book-appointment-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';


const UX = [
  ButtonModule,
  InputTextareaModule,
  CalendarModule
];

@NgModule({
  declarations: [BookAppointmentComponent],
  imports: [
    CommonModule,
    BookAppointmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...UX
  ],
})
export class BookAppointmentModule { }
