import { Component, OnInit } from '@angular/core';
import { Doctor, User } from 'src/app/api';
import { Appointments } from 'src/app/models/appointments';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css'],
})
export class PieComponent implements OnInit {
  //totals
  totDoctors: number = 0;
  totAppointments: number = 0;
  totReceptionists: number = 0;
  totPatients: number = 0;

  data: any;

  options: any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadChart();
  }

  getTotDoctors() {
    this.adminService.getAllDoctors().subscribe((res: Doctor[]) => {
      this.totDoctors = res.length;
      this.updateChart();
    });
  }

  getTotPatients() {
    this.adminService.getAllPatients().subscribe((res: User[]) => {
      this.totPatients = res.length;
      this.updateChart();
    });
  }

  getTotReceptionists() {
    this.adminService.getAllReceptionists().subscribe((res: User[]) => {
      this.totReceptionists = res.length;
      this.updateChart();
    });
  }

  getTotAppointments() {
    this.adminService.getAllAppointments().subscribe((res: Appointments[]) => {
      this.totAppointments = res.length;
      this.updateChart();
    });
  }

  loadChart() {
    this.getTotDoctors();
    this.getTotPatients();
    this.getTotAppointments();
    this.getTotReceptionists();
  }

  updateChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['Patients', 'Doctors', 'Receptionists', 'Appointments'],
      datasets: [
        {
          data: [
            this.totPatients,
            this.totDoctors,
            this.totReceptionists,
            this.totAppointments,
          ],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--pink-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--pink-400'),
          ],
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
  }
}
