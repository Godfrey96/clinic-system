---------------Table creation
CREATE TABLE appointment(
	appointment_id bigint NOT NULL PRIMARY KEY IDENTITY(1,1),
	appointment_booking_date datetime,
	problem varchar (255),
	status varchar (255),
	doctor_user_id bigint,
	patient_user_id bigint,
	slot_slot_id bigint)


CREATE TABLE slot(
	slot_id bigint NOT NULL PRIMARY KEY IDENTITY(1,1),
	date_time DATETIME,
	doctor_id bigint,
	patient_id bigint,
	time time)

CREATE TABLE hospital_users(
	user_id bigint NOT NULL PRIMARY KEY IDENTITY(1,1),
	activation_token varchar (255),
	address varchar (255),
	contact_no varchar (15),
	email varchar (255),
	enabled varchar (255),
	first_name varchar (255),
	last_name varchar (255),
	password varchar (255))

CREATE TABLE role(
	role_id bigint NOT NULL PRIMARY KEY IDENTITY(1,1),
	role_name varchar (255))

CREATE TABLE user_role(
	user_id bigint,
	role_id bigint)

CREATE TABLE doctor(
	specialization varchar (255),
	user_id bigint)

CREATE TABLE patients(
	blood_group varchar (5),
	user_id bigint,
	doctor_id bigint)

----------------------Joining tables through keys
SELECT role.role_id 
	FROM role
	LEFT JOIN user_role
		on role.role_id = user_role.role_id;


SELECT hospital_users.user_id
	FROM hospital_users
	LEFT JOIN user_role
		on hospital_users.user_id = user_role.user_id
	LEFT JOIN doctor
		on doctor.user_id = user_role.user_id
	LEFT JOIN patients
		on patients.user_id = user_role.user_id;

SELECT * 
	FROM patients
	LEFT JOIN doctor
		ON doctor.user_id = patients.doctor_id;

SELECT * 
	FROM doctor
	LEFT JOIN user_role
		ON doctor.user_id = user_role.role_id;

SELECT * 
	FROM appointment
	LEFT JOIN  doctor
		ON doctor.user_id = appointment.doctor_user_id
	LEFT JOIN patients
		ON patients.user_id = appointment.patient_user_id
	LEFT JOIN slot
		ON slot.slot_id = appointment.slot_slot_id;

INSERT INTO role (role_name) VALUES('ADMIN');
INSERT INTO role (role_name) VALUES('DOCTOR');
INSERT INTO role (role_name) VALUES('RECEPTION');
INSERT INTO role (role_name) VALUES('PATIENT');



	/*
	DROP TABLE appointment;
	DROP TABLE slot;
	DROP TABLE hospital_users;
	DROP TABLE role;
	DROP TABLE user_role;
	DROP TABLE doctor;
	DROP TABLE patients;
	*/

	
	SELECT * FROM appointment;
	SELECT * FROM doctor;
	SELECT * FROM hospital_users;	
	SELECT * FROM patients;
	SELECT * FROM role;
	SELECT * FROM slot;
	SELECT * FROM user_role;



	-----------------THIS SHOWS RESULTS 
SELECT hospital_users.user_id, hospital_users.email, role.role_name
	FROM hospital_users
	LEFT JOIN user_role 
		on hospital_users.user_id = user_role.user_id
	LEFT JOIN role
		on user_role.role_id = role.role_id;