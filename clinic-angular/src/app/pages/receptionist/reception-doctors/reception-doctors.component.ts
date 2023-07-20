import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { ReceptionService } from 'src/app/services/reception.service';

@Component({
  selector: 'app-reception-doctors',
  templateUrl: './reception-doctors.component.html',
  styleUrls: ['./reception-doctors.component.css'],
})
export class ReceptionDoctorsComponent implements OnInit {
  doctors!: Doctor[];

  constructor(private receptionService: ReceptionService) {}

  ngOnInit(): void {
    this._getAllDoctors();
  }

  private _getAllDoctors() {
    this.receptionService.getAllDoctors().subscribe((doctor: Doctor[]) => {
      this.doctors = doctor;
      console.log('reception-doctors: ', doctor);
    });
  }
}
