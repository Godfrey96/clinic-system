import { Component, OnInit } from '@angular/core';
import { Doctor, User } from 'src/app/api';
import { Appointments } from 'src/app/models/appointments';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  //totals
  totDoctors: number = 0;
  totAppointments: number = 0;
  totReceptionists: number = 0;
  totPatients: number = 0;

  basicData: any;

  basicOptions: any;

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
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['Patients', 'Doctors', 'Receptionists', 'Appointments'],
      datasets: [
        {
          label: 'Clinic Management System',
          data: [
            this.totPatients,
            this.totDoctors,
            this.totReceptionists,
            this.totAppointments,
          ],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 1,
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
