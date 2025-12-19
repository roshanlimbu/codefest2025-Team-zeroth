# Authentication Routes API Documentation

This document describes the authentication HTTP API endpoints.

**Base Path:** `/`

---

## POST /register

**Description:** Start a registration by sending an OTP to the provided email. The user is NOT persisted to the database until OTP verification completes.

**Request Body:**
```json
{
  "name": "string",
  "email": "user@example.com",
  "password": "plainTextPassword"
}
```

**Success Response (201 Created):**
```json
{
  "message": "OTP sent. Complete verification to finish registration."
}
```

**Error Responses:**
- 400: Missing fields → `{ "error": "name, email and password required" }`
- 400: User exists → `{ "error": "User already exists" }`

**Example:**
```bash
curl -X POST http://localhost:8080/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"s3cret"}'
```

---

## POST /verifyOTP

**Description:** Verify an OTP previously sent by `/register`. On success, the user is created in the DB and a `userId` is returned.

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Success Response (200 OK):**
```json
{
  "message": "OTP verified and user registered",
  "userId": "<created-user-id>"
}
```

**Error Responses:**
- 400: Missing fields → `{ "error": "email and otp required" }`
- 400: No pending registration → `{ "error": "No pending registration for this email" }`
- 400: Expired OTP → `{ "error": "OTP expired. Please register again." }`
- 400: Invalid OTP → `{ "error": "Invalid OTP" }`
- 400: User already exists → `{ "error": "User already exists" }`

**Example:**
```bash
curl -X POST http://localhost:8080/verifyOTP \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","otp":"123456"}'
```

---

## POST /login

**Description:** Authenticate a verified user. On success, a session is created, a cookie containing the session ID is set, and a CSRF token is returned in the response body.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "plainTextPassword"
}
```

**Success Response (200 OK):**

**Headers:**
- `Set-Cookie: sid=<sessionId>; HttpOnly; SameSite=Lax; Secure=<depends>`

**Body:**
```json
{
  "message": "Logged in",
  "csrfToken": "<csrf-token-string>"
}
```

**Error Responses:**
- 400: Invalid credentials → `{ "error": "Invalid credentials" }`
- 403: User not verified → `{ "error": "User not verified" }`

**Notes:**
- The cookie name is `sid` by default; change via `COOKIE_NAME` env var
- The app currently sets `secure: false` for cookies (development). Set to `true` for production over HTTPS
- The CSRF token must be included in subsequent protected requests

**Example:**
```bash
curl -i -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"s3cret"}'
```

---

## POST /logout

**Description:** Log out the authenticated user by destroying their session and clearing the session cookie.

**Required:**
- Cookie: `sid` (session ID cookie)

**Success Response (200 OK):**
```json
{
  "message": "Logged out"
}
```

**Error Responses:**
- 400: No active session → `{ "error": "No active session" }`

**Example:**
```bash
curl -X POST http://localhost:8080/logout \
  --cookie "sid=<sessionId>"
```

---

## POST /verifyKYC

**Description:** Mark a user as KYC verified. Sets the `kycVerified` flag to `true` for the specified user. Admin only endpoint.

**Request Body:**
```json
{
  "userId": "<user-id>"
}
```

**Success Response (200 OK):**
```json
{
  "message": "KYC verified successfully"
}
```

**Error Responses:**
- 404: User not found → `{ "error": "User not found" }`

**Example:**
```bash
curl -X POST http://localhost:8080/verifyKYC \
  -H "Content-Type: application/json" \
  -d '{"userId":"123e4567-e89b-12d3-a456-426614174000"}'
```

---

## POST /submitKYC

**Description:** Submit KYC documents for verification. Users upload their citizenship (front and back), passport, photo, and signature along with their phone number. Requires authentication.

**For detailed KYC API documentation, see [kyc-routes.md](kyc-routes.md)**

**Required Headers:**
- Cookie: `sid` (session ID cookie from login)
- `x-xsrf-token` or `x-csrf-token`: CSRF token returned from `/login`

**Content-Type:** `multipart/form-data`

**Form Fields:**
- `phoneNumber` (required): User's phone number (string)
- `citizenship` (required): Citizenship document images - 2 files (front and back) using same field name
- `passport` (optional): Passport document image file
- `photo` (required): User's photo file
- `signature` (required): User's signature image file

**Success Response (200 OK):**
```json
{
  "message": "KYC documents submitted successfully",
  "user": {
    "id": "user-id-uuid",
    "name": "User Name",
    "email": "user@example.com",
    "phoneNumber": "+9771234567890",
    "kycSubmittedAt": "2025-12-19T12:00:00.000Z",
    "kycVerified": false
  }
}
```

**Error Responses:**
- 401: Not authenticated → `{ "error": "Not authenticated" }`
- 400: Missing phone number → `{ "error": "Phone number is required" }`
- 400: Missing documents → `{ "error": "KYC documents are required" }`

**Example:**
```bash
curl -X POST http://localhost:8080/submitKYC \
  -H "x-xsrf-token: <csrf-token-from-login>" \
  --cookie "sid=<session-id-from-login>" \
  -F "phoneNumber=+9771234567890" \
  -F "citizenship=@citizenship-front.jpg" \
  -F "citizenship=@citizenship-back.jpg" \
  -F "passport=@passport.jpg" \
  -F "photo=@photo.jpg" \
  -F "signature=@signature.png"
```

**Notes:**
- User must be logged in to submit KYC
- `citizenship` accepts 2 files - upload both front and back using the same field name
- Documents are stored in the `/uploads` directory
- All document URLs are saved in the database as JSON
- Admin can verify KYC later using `/verifyKYC` endpoint
- Once submitted, `kycSubmittedAt` timestamp is recorded

---

## Environment Variables

- `OTP_SERVICE` - Base URL for the OTP/mailer service (default: `http://localhost:8081`)
- `COOKIE_NAME` - Name of session cookie (default: `sid`)
- `SESSION_TTL_MINUTES` - Session lifetime in minutes (default: `60`)

## Security Notes

- The OTP flow stores pending registrations in-memory (`Map`) and will be lost if the process restarts; for production consider persisting to DB/Redis
- In production, enable `secure: true` for session cookies and serve over HTTPS
- Ensure the mailer service is accessible from the app if running in Docker
