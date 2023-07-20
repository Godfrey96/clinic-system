import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionDoctorsRoutingModule } from './reception-doctors-routing.module';
import { ReceptionDoctorsComponent } from './reception-doctors.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

const UX = [
  TableModule,
  ButtonModule,
  DialogModule
]

@NgModule({
  declarations: [
    ReceptionDoctorsComponent
  ],
  imports: [
    CommonModule,
    ReceptionDoctorsRoutingModule,
    ...UX
  ]
})
export class ReceptionDoctorsModule { }
