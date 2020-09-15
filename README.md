## GoBarber Api (Node.js && Express.js && Postgres)

<!-- <img src="" alt="WhatsApp Api" /> -->

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
