import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SlotRequest } from '../models/slot-request';
import { Slot } from '../models/slot';

@Injectable({
  providedIn: 'root',
})
export class SlotService {
  apiURL = environment.apiUrl + '/slot';

  constructor(private http: HttpClient) {}

  createSlot(slot: SlotRequest) {
    return this.http.post<SlotRequest>(this.apiURL + '/create-slot', slot);
  }

  getAvailableSlotsByDoctor(slotId: number) {
    return this.http.get<Slot[]>(this.apiURL + '/slots/' + slotId);
  }

  getAllAvailableSlots() {
    return this.http.get<Slot[]>(this.apiURL + '/available-slots');
  }
}
