import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apmodal',
  templateUrl: './apmodal.component.html',
  styleUrls: ['./apmodal.component.css'],
})
export class ApmodalComponent {
  constructor(private router: Router){

  }
  ngOnInit(): void {}
  updateUser() {}

  close(){
    this.router.navigate(['/admin-patient']);
  }
}
