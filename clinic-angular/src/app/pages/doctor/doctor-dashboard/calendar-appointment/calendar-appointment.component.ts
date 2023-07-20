import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from 'fullcalendar';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Appointments } from 'src/app/models/appointments';
import { Doctor } from 'src/app/models/doctor';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-calendar-appointment',
  templateUrl: './calendar-appointment.component.html',
  styleUrls: ['./calendar-appointment.component.css'],
})
export class CalendarAppointmentComponent implements OnInit {
  modalRef?: BsModalRef;
  title: any;
  presentDays: number = 0;
  absentDays: number = 0;
  appointments!: Appointments[];
  doctor: number | undefined;

  events: any = [
    { title: 'Present', date: '2023-06-30', color: '#0000FF' },
    { title: 'Absent', date: '2023-06-27', color: '#0000FF' },
    { title: 'Present', date: '2023-06-25', color: '#FF0000' },
    { title: 'Meeting', start: new Date() },
  ];

  // calendarOptions!: CalendarOptions;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    // weekends: false,
    events: this.events,
    // events: this.appointments,
    eventClick: this.handleDateClick.bind(this),
  };
  config = {
    animated: true,
  };
  @ViewChild('template') template!: string;
  start: any;

  constructor(
    private modalService: BsModalService,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.events.forEach((e: { [x: string]: string }) => {
      if (e['title'] == 'Present') {
        this.presentDays++;
      } else {
        this.absentDays++;
      }
    });
    // console.log('Present ' + this.presentDays);
    // console.log('Absent ' + this.absentDays);
    this.getCurrentDoctor();
    // this.getAppointmentsForDoctor();
  }

  getCurrentDoctor() {
    this.doctorService.getCurrentDoctor().subscribe((doctor: Doctor) => {
      this.doctor = doctor.userId;
      this.getAppointmentsForDoctor();
    });
  }

  getAppointmentsForDoctor() {
    this.appointmentService
      .getAppointmentsForDoctor(this.doctor)
      .subscribe((res: any) => {
        console.log('res-res: ', res);
        this.appointments = res;
        console.log('this.appointments: ', this.appointments);

        this.calendarOptions = {
          // plugins: [dayGridPlugin],
          initialView: 'dayGridMonth',
          events: this.appointments.map((appointment: Appointments) => ({
            title: appointment.problem,
          })),
          // events: res.map((appointment: any) => ({
          //   title: appointment.problem,
          // })),
        };
      });
  }

  clickqq() {
    this.getAppointmentsForDoctor();
  }

  handleDateClick(arg: any) {
    console.log('argsss', arg);
    console.log('this.appointments', this.appointments);
    console.log(arg.event._def.title);
    this.title = arg.event._def.title;
    this.start = arg.event.start;
    this.modalRef = this.modalService.show(this.template, this.config);
  }
}
