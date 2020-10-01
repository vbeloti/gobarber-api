## GoBarber Api (Node.js && Express.js && Postgres)

# GoBarber Api

## Open Endpoints

* [Users]: `POST /users` -- Create One User

# Closed endpoints required Authentication.

* [Users]: `PATCH /users/avatar` -- Update User Avatar
* [Appointments]: `POST /appointments` -- Create One Appointment
* [Appointments]: `GET /appointments` -- List All Appointments
* [Profile]: `PUT /profile` -- Update profile
* [Profile]: `GET /profile` -- Show profile

# Token Generator required Email and Password

* [Session]: `PATCH /sessions` -- Generate Token Access

# Password recovery and generator

* [Password]: `PATCH /password/forgot` -- Send token to email for validation
* [Password]: `PATCH /password/reset` -- Generate new password

