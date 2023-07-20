import { Component } from '@angular/core';

@Component({
  selector: 'app-receptionist-dashboard',
  templateUrl: './receptionist-dashboard.component.html',
  styleUrls: ['./receptionist-dashboard.component.css']
})
export class ReceptionistDashboardComponent {
  customers = [
    {
      id: 1000,
      name: 'James',
      lastname: 'Butt',
      email: 'james@gmail.com',
      contact: '0123456789',
      address: '76 Braamfontein',
      status: 'unqualified',
      verified: true,
      activity: 17,
      representative: {
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png'
      },
      balance: 70663
    }
  ]
}
