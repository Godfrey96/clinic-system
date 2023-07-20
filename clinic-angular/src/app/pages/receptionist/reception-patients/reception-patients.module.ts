import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionPatientsRoutingModule } from './reception-patients-routing.module';
import { ReceptionPatientsComponent } from './reception-patients.component';
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
    ReceptionPatientsComponent
  ],
  imports: [
    CommonModule,
    ReceptionPatientsRoutingModule,
    ...UX
  ]
})
export class ReceptionPatientsModule { }
