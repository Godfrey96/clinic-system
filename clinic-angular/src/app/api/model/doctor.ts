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
import { Role } from './role';
import { Patient } from './patient';


export interface Doctor { 
    userId?: number;
    firstName?: string;
    lastName?: string;
    contactNo?: string;
    email?: string;
    address?: string;
    roles?: Set<Role>;
    enabled?: string;
    activationToken?: string;
    specialization?: string;
    patients?: Array<Patient>;
}
