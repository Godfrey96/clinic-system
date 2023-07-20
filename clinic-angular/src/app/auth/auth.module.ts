import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeHeaderComponent } from '../shared/home-header/home-header.component';
import { HomeHeaderModule } from '../shared/home-header/home-header.module';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HomeHeaderModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [SignInComponent, SignUpComponent],
})
export class AuthModule {}
