# KYC Routes API Documentation

This document describes the KYC (Know Your Customer) submission and verification HTTP API endpoints.

**Base Path:** `/`

---

## POST /submitKYC

**Description:** Submit KYC documents for verification. Users upload their citizenship (front and back), passport, photo, and signature along with their phone number. This endpoint requires authentication and must be called after logging in.

**Authentication Required:** Yes

**Required Headers:**
- Cookie: `sid` (session ID cookie from login)
- `x-xsrf-token` or `x-csrf-token`: CSRF token returned from `/login`

**Content-Type:** `multipart/form-data`

**Form Fields:**
- `phoneNumber` (required): User's phone number (string)
- `citizenship` (required): Citizenship document images - upload 2 files with the same field name (front and back)
- `passport` (optional): Passport document image file
- `photo` (required): User's photo file
- `signature` (required): User's signature image file

**Success Response (200 OK):**
```json
{
  "message": "KYC documents submitted successfully",
  "user": {
    "id": "cmjcs4gnn00008srnywnergpf",
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

**Example (curl):**
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

**Example (JavaScript/Fetch):**
```javascript
const formData = new FormData();
formData.append('phoneNumber', '+9771234567890');
formData.append('citizenship', citizenshipFrontFile); // File object
formData.append('citizenship', citizenshipBackFile);  // Same field name
formData.append('passport', passportFile);
formData.append('photo', photoFile);
formData.append('signature', signatureFile);

fetch('http://localhost:8080/submitKYC', {
  method: 'POST',
  headers: {
    'x-xsrf-token': csrfToken // from login response
  },
  credentials: 'include', // sends cookies automatically
  body: formData
});
```

**Notes:**
- User must be logged in to submit KYC
- All uploaded files are stored in the `/uploads` directory
- All document URLs are saved in the database as JSON
- `citizenship` field accepts 2 files (front and back) - use the same field name twice
- Once submitted, `kycSubmittedAt` timestamp is recorded
- `kycVerified` remains `false` until admin approval

**KYC Documents Structure:**
```json
{
  "citizenship": [
    "/uploads/1234567890-citizenship-front.jpg",
    "/uploads/1234567891-citizenship-back.jpg"
  ],
  "passport": "/uploads/1234567892-passport.jpg",
  "photo": "/uploads/1234567893-photo.jpg",
  "signature": "/uploads/1234567894-signature.png"
}
```

---

## POST /verifyKYC

**Description:** Mark a user as KYC verified. Sets the `kycVerified` flag to `true` for the specified user. This is an admin-only endpoint used to approve KYC submissions after manual review.

**Authentication Required:** No (should be protected in production with admin middleware)

**Request Body:**
```json
{
  "userId": "cmjcs4gnn00008srnywnergpf"
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
  -d '{"userId":"cmjcs4gnn00008srnywnergpf"}'
```

**Notes:**
- This endpoint should be protected with admin authentication in production
- Sets `kycVerified` to `true` in the database
- Does not modify the submitted documents or phone number

---

## KYC Workflow

1. **User Registration & Login**
   - User registers via `POST /register`
   - Verifies OTP via `POST /verifyOTP`
   - Logs in via `POST /login` to get session cookie and CSRF token

2. **KYC Submission**
   - User submits KYC documents via `POST /submitKYC` (authenticated)
   - System stores documents and sets `kycSubmittedAt` timestamp
   - `kycVerified` is set to `false`

3. **Admin Review**
   - Admin reviews submitted documents
   - Admin approves by calling `POST /verifyKYC`
   - System sets `kycVerified` to `true`

4. **Verification Status**
   - User can check status via `GET /api/profile`
   - Response includes `kycVerified` boolean flag

---

## Database Schema

**User Model KYC Fields:**
```typescript
{
  phoneNumber: string | null;           // Phone number
  kycDocuments: JSON | null;             // Document URLs as JSON
  kycSubmittedAt: DateTime | null;       // Submission timestamp
  kycVerified: boolean;                  // Verification status (default: false)
}
```

---

## File Upload Specifications

**Supported File Types:**
- Images: JPEG, PNG, GIF, WebP
- Maximum file size: Configured in multer (default varies)
- Maximum files per request: 5 (2 citizenship + 3 other documents)

**Field Names and Limits:**
- `citizenship`: 2 files (front and back)
- `passport`: 1 file
- `photo`: 1 file
- `signature`: 1 file

**Storage:**
- Files are stored in `/uploads` directory
- Filenames are generated with timestamp prefix to avoid conflicts
- URLs are stored in database as relative paths: `/uploads/filename.ext`

---

## Security Considerations

1. **Authentication Required**
   - All KYC operations require valid session authentication
   - CSRF token must be included in requests

2. **File Validation**
   - Validate file types on server side
   - Check file sizes to prevent abuse
   - Scan for malware in production

3. **Admin Protection**
   - `/verifyKYC` should be protected with admin role checking
   - Implement audit logging for KYC approvals

4. **Data Privacy**
   - Sensitive documents should be encrypted at rest
   - Access to uploaded files should be restricted
   - Implement proper access controls on `/uploads` directory

---

## Related Endpoints

- [POST /login](auth-routes.md#post-login) - Authenticate to get session
- [POST /logout](auth-routes.md#post-logout) - End session
- [GET /api/profile](profile-routes.md#get-apiprofile) - Get user profile with KYC status
- [POST /register](auth-routes.md#post-register) - Create new user account
