# API Documentation

This document describes the HTTP API exposed by the application in this repository.

Notes:
- The app mounts auth routes at `/` and profile routes under `/api`.
- Default cookie name: `sid` (override with environment variable `COOKIE_NAME`).
- OTP service base URL is configured by `OTP_SERVICE` env var (default `http://localhost:8081`).
- Session TTL controlled by `SESSION_TTL_MINUTES` env var (default 60).

---

**POST /register**

- Description: Start a registration by sending an OTP to the provided email. The user is NOT persisted to the database until OTP verification completes.
- Request JSON payload:

```json
{
  "name": "string",
  "email": "user@example.com",
  "password": "plainTextPassword"
}
```

- Success response (201 Created):

```json
{
  "message": "OTP sent. Complete verification to finish registration."
}
```

- Errors (examples):
  - 400: missing fields -> `{ "error": "name, email and password required" }`
  - 400: user exists -> `{ "error": "User already exists" }`

---

**POST /verifyOTP**

- Description: Verify an OTP previously sent by `/register`. On success the user is created in the DB and a `userId` is returned.
- Request JSON payload:

```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

- Success response (200 OK):

```json
{
  "message": "OTP verified and user registered",
  "userId": "<created-user-id>"
}
```

- Errors (examples):
  - 400: missing fields -> `{ "error": "email and otp required" }`
  - 400: no pending registration -> `{ "error": "No pending registration for this email" }`
  - 400: expired OTP -> `{ "error": "OTP expired. Please register again." }`
  - 400: invalid OTP -> `{ "error": "Invalid OTP" }`
  - 400: user already exists -> `{ "error": "User already exists" }`

---

**POST /login**

- Description: Authenticate a verified user. On success a session is created, a cookie containing the session id is set, and a CSRF token is returned in the response body.
- Request JSON payload:

```json
{
  "email": "user@example.com",
  "password": "plainTextPassword"
}
```

- Success response (200 OK):

Headers set by server:
- `Set-Cookie: sid=<sessionId>; HttpOnly; SameSite=Lax; Secure=<depends>`

Body:

```json
{
  "message": "Logged in",
  "csrfToken": "<csrf-token-string>"
}
```

- Notes:
  - The cookie name is `sid` by default; change via `COOKIE_NAME` env var.
  - The app currently sets `secure: false` for cookies (development). Set to `true` for production over HTTPS.
  - Response status codes:
    - 400: invalid credentials -> `{ "error": "Invalid credentials" }`
    - 403: user not verified -> `{ "error": "User not verified" }`

---

**GET /api/profile**

- Description: Returns the authenticated user's profile. Protected route — requires a valid session cookie and XSRF header.
- Required:
  - Cookie: `sid` (session id cookie)
  - Header: one of `x-xsrf-token` or `x-csrf-token` with the CSRF token returned by `/login`

- Success response (200 OK):

```json
{
  "ok": true,
  "user": {
    "id": "<user-id>",
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

- Errors (examples):
  - 401: no session cookie -> `{ "error": "No session cookie" }`
  - 401: invalid session -> `{ "error": "Invalid session" }`
  - 401: session expired -> `{ "error": "Session expired" }`
  - 403: missing XSRF token -> `{ "error": "Missing XSRF token header" }`
  - 403: invalid XSRF token -> `{ "error": "Invalid XSRF token" }`

---

Environment variables that influence behavior:
- `PORT` - port the app listens on (default `8080`).
- `OTP_SERVICE` - base URL for the OTP/mailer service (default `http://localhost:8081`).
- `COOKIE_NAME` - name of session cookie (default `sid`).
- `SESSION_TTL_MINUTES` - session lifetime in minutes (default `60`).

Security notes and operational tips:
- The OTP flow stores pending registrations in-memory (`Map`) and will be lost if the process restarts; for production consider persisting to DB/Redis.
- Ensure the mailer binds to `0.0.0.0` if the app runs inside Docker and the mailer runs on the host, or run the mailer as a service inside the same `docker-compose` network.
- In production enable `secure: true` for session cookies and serve over HTTPS.

Examples (curl):

Register:

```bash
curl -X POST http://localhost:8080/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"s3cret"}'
```

Verify OTP:

```bash
curl -X POST http://localhost:8080/verifyOTP \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","otp":"123456"}'
```

Login:

```bash
curl -i -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"s3cret"}'
```

Get profile (after login):

```bash
# first extract cookie and csrfToken from /login response; then
curl -X GET http://localhost:8080/api/profile \
  -H "x-xsrf-token: <csrf-token-value>" \
  --cookie "sid=<sessionId>"
```

