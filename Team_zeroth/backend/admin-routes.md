# Admin Routes API Documentation

This document describes the admin-only HTTP API endpoints for user management.

**Base Path:** `/admin` (or as mounted in your app)

**Authentication Required:** All routes require valid session authentication via the `requireAuth` middleware.

---

## GET /users

**Description:** Get all users in the system. This endpoint uses Prisma Accelerate with caching for improved performance.

**Required Headers:**
- Cookie: `sid` (session ID cookie from login)
- `x-xsrf-token` or `x-csrf-token`: CSRF token returned from `/login`

**Success Response (200 OK):**
```json
{
  "users": [
    {
      "id": "user-id-uuid",
      "name": "User Name",
      "email": "user@example.com",
      "password": "hashed-password",
      "verified": true,
      "kycVerified": false,
      "createdAt": "2025-12-19T12:00:00.000Z",
      "updatedAt": "2025-12-19T12:00:00.000Z"
    },
    {
      "id": "another-user-id",
      "name": "Another User",
      "email": "another@example.com",
      "password": "hashed-password",
      "verified": true,
      "kycVerified": true,
      "createdAt": "2025-12-19T11:00:00.000Z",
      "updatedAt": "2025-12-19T11:30:00.000Z"
    }
  ]
}
```

**Error Responses:**
- 401: No session cookie → `{ "error": "No session cookie" }`
- 401: Invalid session → `{ "error": "Invalid session" }`
- 401: Session expired → `{ "error": "Session expired" }`
- 403: Missing CSRF token → `{ "error": "Missing XSRF token header" }`
- 403: Invalid CSRF token → `{ "error": "Invalid XSRF token" }`

**Cache Strategy:**
- **TTL:** 30 seconds - Data is considered fresh for 30 seconds
- **SWR:** 60 seconds - Stale data can be served for up to 60 seconds while fetching fresh data in the background

**Example:**
```bash
curl -X GET http://localhost:8080/admin/users \
  -H "x-xsrf-token: <csrf-token-from-login>" \
  --cookie "sid=<session-id-from-login>"
```

---

## Authentication Flow

To access admin endpoints, you must:

1. **Login** using `POST /login` to obtain:
   - Session cookie (`sid`)
   - CSRF token (`csrfToken` in response body)

2. **Include both** in subsequent admin requests:
   - Cookie automatically sent by browser or via `--cookie` in curl
   - CSRF token in `x-xsrf-token` or `x-csrf-token` header

**Complete Example:**

```bash
# Step 1: Login
LOGIN_RESPONSE=$(curl -i -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"adminpass"}')

# Extract session cookie and CSRF token
SESSION_COOKIE=$(echo "$LOGIN_RESPONSE" | grep -i "set-cookie" | sed 's/.*sid=\([^;]*\).*/\1/')
CSRF_TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"csrfToken":"[^"]*"' | sed 's/"csrfToken":"\(.*\)"/\1/')

# Step 2: Get all users
curl -X GET http://localhost:8080/admin/users \
  -H "x-xsrf-token: $CSRF_TOKEN" \
  --cookie "sid=$SESSION_COOKIE"
```

---

## User Object Schema

Each user object contains:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (UUID) | Unique user identifier |
| `name` | string | User's full name |
| `email` | string | User's email address (unique) |
| `password` | string | Hashed password (Argon2) |
| `verified` | boolean | Email verification status |
| `kycVerified` | boolean | KYC verification status |
| `createdAt` | string (ISO8601) | Account creation timestamp |
| `updatedAt` | string (ISO8601) | Last update timestamp |

---

## Performance Notes

This endpoint uses **Prisma Accelerate** for improved performance:

- **Caching:** Results are cached for 30 seconds to reduce database load
- **Stale-While-Revalidate (SWR):** Stale data (up to 60 seconds old) can be served immediately while fresh data is fetched in the background
- This ensures fast response times even under high load

---

## Security Notes

- The `requireAuth` middleware validates both the session and CSRF token
- Only authenticated users can access admin endpoints
- Consider adding role-based access control (RBAC) to restrict this endpoint to admin users only
- User passwords are returned in hashed format (Argon2)
- For production, implement additional authorization checks to ensure only admins can access this endpoint

---

## Environment Variables

- `COOKIE_NAME` - Name of session cookie (default: `sid`)
- `SESSION_TTL_MINUTES` - Session lifetime in minutes (default: `60`)

---

## Related Endpoints

- [POST /login](auth-routes.md#post-login) - Authenticate and get session
- [POST /logout](auth-routes.md#post-logout) - End session
- [POST /verifyKYC](auth-routes.md#post-verifykYC) - Verify user KYC status
- [GET /api/profile](profile-routes.md#get-apiprofile) - Get current user profile

---

## Future Enhancements

Consider implementing:
- `GET /users/:id` - Get a specific user by ID
- Role-based access control (RBAC)
- User update and delete operations
- Filtering and pagination for large user lists
- Search functionality
