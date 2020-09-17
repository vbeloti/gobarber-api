## GoBarber Api (Node.js && Express.js && Postgres)

# GoBarber Api

## Open Endpoints

Open endpoints require no Authentication.

* [Users]: `POST /users` -- Create One User

Closed endpoints required Authentication.

* [Users]: `PATCH /users/avatar` -- Update User Avatar
* [Appointments]: `POST /appointments` -- Create One Appointment
* [Appointments]: `GET /appointments` -- List All Appointments

Token Generator required Email and Password

* [Session]: `PATCH /sessions` -- Generate Token Access

# Password recovery

**RF**

  - The user must be able to recover his password informing his email;
  - The user should receive an email with password recovery instructions;
  - The user must be able to reset his password;

**RNF**
  - Use mailtrap to test shipments in a dev environment;
  - Use Amazon SES for production shipments;
  - The sending of e-mails must happen in the background (background job);

**RN**
  - The link sent by email to reset password must expire in 2h;
  - The user needs to confirm the new password when resetting his password;

# Profile update

**RF**

  - The user must be able to update his name, email and password

**RNF**
  - The user cannot change his / her already used email;
  - To update your password, the user must enter the old password;
  - To update your password, the user needs to confirm the new password;

# Provider panel

**RF**

  - The user must be able to list their schedules for a specific day;
  - The provider must receive a notification whenever there is a new appointment;
  - The provider must be able to view unread notifications;

**RNF**
  - The provider's schedules on the day must be cached;
  - The provider's notifications must be stored in MongoDB;
  - The provider's notifications must be sent in real time using Socket.io;

**RN**
  - The notification must have a read or unread status for the provider to control;

# Scheduling services

**RF**
  - The user must be able to list all registered service providers;
  - The user must be able to list the days of the month with at least one available time from a provider;
  - The user must be able to list available times on a specific day for a provider;
  - The user must be able to make a new appointment with a provider;

**RNF**
  - The list of providers must be cached;

**RN**
  - Each appointment must last exactly 1 hour;
  - Appointments must be available between 8 am and 6 pm (First at 8 am, last at 5 pm);
  - The user cannot schedule at an already busy time;
  - The user cannot schedule an appointment that has already passed;
  - The user cannot schedule services with himself;
