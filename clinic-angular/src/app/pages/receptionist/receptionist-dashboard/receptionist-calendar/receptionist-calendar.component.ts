import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from 'fullcalendar';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-receptionist-calendar',
  templateUrl: './receptionist-calendar.component.html',
  styleUrls: ['./receptionist-calendar.component.css']
})
export class ReceptionistCalendarComponent {
  modalRef?: BsModalRef;
  title: any;
  presentDays: number = 0;
  absentDays: number = 0;
  events: any = [
    { title: 'Present', date: '2023-06-30', color: '#0000FF' },
    { title: 'Absent', date: '2023-06-27', color: '#0000FF' },
    { title: 'Present', date: '2023-06-25', color: '#FF0000' },
    { title: 'Meeting', start: new Date() },
  ];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    // weekends: false,
    events: this.events,
    eventClick: this.handleDateClick.bind(this),
  };
  config = {
    animated: true,
  };
  @ViewChild('template') template!: string;
  start: any;
  constructor(private modalService: BsModalService) {}
  ngOnInit(): void {
    this.events.forEach((e: { [x: string]: string }) => {
      if (e['title'] == 'Present') {
        this.presentDays++;
      } else {
        this.absentDays++;
      }
    });
    console.log('Present ' + this.presentDays);
    console.log('Absent ' + this.absentDays);
  }
  handleDateClick(arg: any) {
    console.log(arg);
    console.log(arg.event._def.title);
    this.title = arg.event._def.title;
    this.start = arg.event.start;
    this.modalRef = this.modalService.show(this.template, this.config);
  }
}
