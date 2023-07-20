import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { ReceptionService } from 'src/app/services/reception.service';

@Component({
  selector: 'app-reception-patients',
  templateUrl: './reception-patients.component.html',
  styleUrls: ['./reception-patients.component.css']
})
export class ReceptionPatientsComponent implements OnInit {

  patients!: Patient[];

  constructor(
    private receptionService: ReceptionService
  ) { }

  ngOnInit(): void {
    this._getAllPatients();
  }

  private _getAllPatients() {
    this.receptionService.getAllPatients().subscribe((patient: Patient[]) => {
      this.patients = patient;
    })
  }

}
