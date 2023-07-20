import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './layouts/admin/footer/footer.component';
import { HeaderComponent } from './layouts/admin/header/header.component';
import { SidebarComponent } from './layouts/admin/sidebar/sidebar.component';
import { MainComponent } from './layouts/admin/main/main.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './guards/auth.interceptor';
import { PatientLayoutComponent } from './layouts/patient/patient-layout/patient-layout.component';
import { PatientHeaderComponent } from './layouts/patient/patient-header/patient-header.component';
import { PatientSidebarComponent } from './layouts/patient/patient-sidebar/patient-sidebar.component';
import { DoctorHeaderComponent } from './layouts/doctor/doctor-header/doctor-header.component';
import { DoctorSidebarComponent } from './layouts/doctor/doctor-sidebar/doctor-sidebar.component';
import { DoctorLayoutComponent } from './layouts/doctor/doctor-layout/doctor-layout.component';
import { ChangePasswordComponent } from './shared/change-password/change-password.component';
import { ProfileSettingsComponent } from './shared/profile-settings/profile-settings.component';
import { ReceptionistHeaderComponent } from './layouts/receptionist/receptionist-header/receptionist-header.component';
import { ReceptionistSidebarComponent } from './layouts/receptionist/receptionist-sidebar/receptionist-sidebar.component';
import { ReceptionistLayoutComponent } from './layouts/receptionist/receptionist-layout/receptionist-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { SuccessComponent } from './components/success/success.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HomeHeaderModule } from './shared/home-header/home-header.module';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: 'Loading...',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  bgsColor: '#00008B',
  fgsColor: '#21b6a8',
  fgsType: SPINNER.chasingDots,
  fgsSize: 100,
  hasProgressBar: false,
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    PatientLayoutComponent,
    PatientHeaderComponent,
    PatientSidebarComponent,
    DoctorHeaderComponent,
    DoctorSidebarComponent,
    DoctorLayoutComponent,
    ChangePasswordComponent,
    ProfileSettingsComponent,
    ReceptionistHeaderComponent,
    ReceptionistSidebarComponent,
    ReceptionistLayoutComponent,
    HomeComponent,
    SuccessComponent,
    NotFoundComponent,
    ForbiddenComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HomeHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot(),
    AuthModule,
    ModalModule,
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
