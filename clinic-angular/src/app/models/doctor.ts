// import { User } from './user';

import { Patient } from './patient';
import { Role } from './role';

// export class Doctor extends User {
//   specialization?: string;
// }

export class Doctor {
  userId?: number;
  firstName?: string;
  lastName?: string;
  contactNo?: string;
  email?: string;
  address?: string;
  roles?: any;
  enabled?: string;
  activationToken?: string;
  specialization?: string;
  patients?: Array<Patient>;
}
