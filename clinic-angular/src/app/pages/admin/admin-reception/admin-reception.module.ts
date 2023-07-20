import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminReceptionRoutingModule } from './admin-reception-routing.module';
import { AdminReceptionComponent } from './admin-reception.component';
import { AddReceptionistComponent } from './add-receptionist/add-receptionist.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const UX = [TableModule, ButtonModule, DialogModule];
@NgModule({
  declarations: [AdminReceptionComponent, AddReceptionistComponent],
  imports: [
    CommonModule,
    AdminReceptionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...UX,
  ],
})
export class AdminReceptionModule {}
