// import { User } from './user';

import { Doctor } from './doctor';
import { Role } from './role';

// export class Patient extends User {
//     bloodGroup?: string;
// }

export class Patient {
  userId?: number;
  firstName?: string;
  lastName?: string;
  contactNo?: string;
  email?: string;
  address?: string;
  roles?: any;
  enabled?: string;
  activationToken?: string;
  bloodGroup?: string;
  doctor?: Doctor;
}
