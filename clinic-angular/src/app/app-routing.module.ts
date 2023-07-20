import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ChangePasswordComponent } from './shared/change-password/change-password.component';
import { ProfileSettingsComponent } from './shared/profile-settings/profile-settings.component';
import { ApmodalComponent } from './pages/admin/admin-patient/apmodal/apmodal.component';
import { HomeComponent } from './home/home.component';
import { SuccessComponent } from './components/success/success.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';

const routes: Routes = [
  // ********************** ADMIN - ROUTES ************************************************
  {
    path: 'admin-dashboard',
    loadChildren: () =>
      import('./pages/admin/admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'admin-doctor',
    loadChildren: () =>
      import('./pages/admin/doctor-dashboard/doctor-dashboard.module').then(
        (m) => m.DoctorDashboardModule
      ),
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'admin-patient',
    loadChildren: () =>
      import('./pages/admin/admin-patient/admin-patient.module').then(
        (m) => m.AdminPatientModule
      ),
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'admin-reception',
    loadChildren: () =>
      import('./pages/admin/admin-reception/admin-reception.module').then(
        (m) => m.AdminReceptionModule
      ),
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: 'admin-appointment',
    loadChildren: () =>
      import('./pages/admin/admin-appointment/admin-appointment.module').then(
        (m) => m.AdminAppointmentModule
      ),
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
  },

  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  // ********************** PATIENT ROUTES ************************************************
  {
    path: 'patient-dashboard',
    loadChildren: () =>
      import('./pages/patient/patient-dashboard/patient-dashboard.module').then(
        (m) => m.PatientDashboardModule
      ),
    canActivate: [AuthGuard],
    data: { roles: ['PATIENT'] },
  },
  {
    path: 'view-appointments',
    loadChildren: () =>
      import('./pages/patient/view-appointments/view-appointments.module').then(
        (m) => m.ViewAppointmentsModule
      ),
    canActivate: [AuthGuard],
    data: { roles: ['PATIENT'] },
  },
  {
    path: 'book-appointment',
    loadChildren: () =>
      import('./pages/patient/book-appointment/book-appointment.module').then(
        (m) => m.BookAppointmentModule
      ),
    canActivate: [AuthGuard],
    data: { roles: ['PATIENT'] },
  },

  // ********************** DOCTOR ROUTES ************************************************
  {
    path: 'profile-settings',
    component: ProfileSettingsComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'apmodal',
    component: ApmodalComponent,
  },

  // DOCTOR ROUTES
  {
    path: 'doctor-dashboard',
    loadChildren: () =>
      import('./pages/doctor/doctor-dashboard/doctor-dashboard.module').then(
        (m) => m.DoctorDashboardModule
      ),
    canActivate: [AuthGuard],
    data: { roles: ['DOCTOR'] },
  },
  {
    path: 'doctor-appointments',
    loadChildren: () =>
      import(
        './pages/doctor/doctor-appointments/doctor-appointments.module'
      ).then((m) => m.DoctorAppointmentsModule),
    canActivate: [AuthGuard],
    data: { roles: ['DOCTOR'] },
  },
  {
    path: 'doctor-patients',
    loadChildren: () =>
      import('./pages/doctor/doctor-patients/doctor-patients.module').then(
        (m) => m.DoctorPatientsModule
      ),
    canActivate: [AuthGuard],
    data: { roles: ['DOCTOR'] },
  },

  // RECEPTION ROUTES********************** RECEPTION ROUTES ************************************************
  {
    path: 'receptionist-dashboard',
    loadChildren: () =>
      import(
        './pages/receptionist/receptionist-dashboard/receptionist-dashboard.module'
      ).then((m) => m.ReceptionistDashboardModule),
    canActivate: [AuthGuard],
    data: { roles: ['RECEPTION'] },
  },
  {
    path: 'receptionist-appointments',
    loadChildren: () =>
      import(
        './pages/receptionist/receptionist-appointments/receptionist-appointments.module'
      ).then((m) => m.ReceptionistAppointmentsModule),
    canActivate: [AuthGuard],
    data: { roles: ['RECEPTION'] },
  },
  {
    path: 'reception-doctors',
    loadChildren: () =>
      import(
        './pages/receptionist/reception-doctors/reception-doctors.module'
      ).then((m) => m.ReceptionDoctorsModule),
    canActivate: [AuthGuard],
    data: { roles: ['RECEPTION'] },
  },
  {
    path: 'reception-patients',
    loadChildren: () =>
      import(
        './pages/receptionist/reception-patients/reception-patients.module'
      ).then((m) => m.ReceptionPatientsModule),
    canActivate: [AuthGuard],
    data: { roles: ['RECEPTION'] },
  },
  {
    path: 'add-slot',
    loadChildren: () =>
      import('./pages/doctor/add-slot/add-slot.module').then(
        (m) => m.AddSlotModule
      ),
    canActivate: [AuthGuard],
    data: { roles: ['DOCTOR'] },
  },
  {
    path: 'view-slots',
    loadChildren: () =>
      import('./pages/doctor/view-slots/view-slots.module').then(
        (m) => m.ViewSlotsModule
      ),
    canActivate: [AuthGuard],
    data: { roles: ['DOCTOR'] },
  },

  { path: 'profile-settings', component: ProfileSettingsComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'apmodal', component: ApmodalComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
