/**
 * OpenAPI Specification - Clinic
 * OpenAPI Documentation for Clinic Management System
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: info@clinicms.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Patient } from './patient';
import { Slot } from './slot';
import { Doctor } from './doctor';


export interface Appointment { 
    appointmentId?: number;
    appointmentBookingDate?: string;
    problem: string;
    status?: string;
    patient?: Patient;
    doctor?: Doctor;
    slot?: Slot;
}

