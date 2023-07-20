import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from 'fullcalendar';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AdminService } from 'src/app/services/admin.service';
import { User } from 'src/app/models/user';
import { Doctor } from 'src/app/models/doctor';
import { Appointments } from 'src/app/models/appointments';
import { AppointmentService } from 'src/app/services/appointment.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  @ViewChild('template') template!: string;
  start: any;
  modalRef?: BsModalRef;
  title: any;
  presentDays: number = 0;
  absentDays: number = 0;

  //totals
  totDoctors: number = 0;
  totAppointments: number = 0;
  totReceptionists: number = 0;
  totPatients: number = 0;

  getAllCalendarAppointments!: Appointments[];

  calendarOptions!: CalendarOptions;

  // events: any = [
  //   { title: 'Present', date: '2023-06-30', color: '#0000FF' },
  //   { title: 'Absent', date: '2023-06-27', color: '#0000FF' },
  //   { title: 'Present', date: '2023-06-25', color: '#FF0000' },
  //   { title: 'Meeting', start: new Date() },
  // ];

  // calendarOptions: CalendarOptions = {
  //   plugins: [dayGridPlugin],
  //   initialView: 'dayGridMonth',
  //   // weekends: false,
  //   events: this.events,
  //   eventClick: this.handleDateClick.bind(this),
  // };
  // config = {
  //   animated: true,
  // };

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private adminService: AdminService
  ) {}
  ngOnInit(): void {
    this.getTotDoctors();
    this.getTotPatients();
    this.getTotAppointments();
    this.getchCalendarAppointments();
    this.getTotReceptionists();
  }

  getTotDoctors() {
    this.adminService.getAllDoctors().subscribe((res: Doctor[]) => {
      this.totDoctors = res.length;
    });
    // this.router.navigate(['/admin-doctor']);
  }

  getTotPatients() {
    this.adminService.getAllPatients().subscribe((res: User[]) => {
      this.totPatients = res.length;
    });
    // this.router.navigate(['/admin-patient']);
  }

  getTotReceptionists() {
    this.adminService.getAllReceptionists().subscribe((res: User[]) => {
      this.totReceptionists = res.length;
    });
    // this.router.navigate(['/admin-reception']);
  }

  getTotAppointments() {
    this.adminService.getAllAppointments().subscribe((res: Appointments[]) => {
      this.totAppointments = res.length;
    });
    // this.router.navigate(['/admin-appointment']);
  }

  doctorCard() {
    this.router.navigate(['/admin-doctor']);
  }

  getchCalendarAppointments() {
    this.adminService
      .getAllAppointments()
      .subscribe((appointment: Appointments[]) => {
        this.getAllCalendarAppointments = appointment;
        console.log(
          'getAllCalendarAppointments: ',
          this.getAllCalendarAppointments
        );

        this.calendarOptions = {
          plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
          initialView: 'dayGridMonth',
          events: this.getAllCalendarAppointments.map((appointment) => ({
            title: appointment.status,
            start: appointment.appointmentBookingDate,
            // date: '2023-06-30',
            // end: appointment.end,
          })),
        };
      });
  }
}
