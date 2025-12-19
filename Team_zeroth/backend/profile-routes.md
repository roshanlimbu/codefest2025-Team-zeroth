# Profile Routes API Documentation

This document describes the profile management HTTP API endpoints.

**Base Path:** `/api`

**Authentication Required:** All routes require valid session authentication and CSRF token.

---

## GET /api/profile

**Description:** Returns the authenticated user's profile information. This is a protected route that requires a valid session cookie and CSRF token.

**Required Headers:**
- Cookie: `sid` (session ID cookie from login)
- `x-xsrf-token` or `x-csrf-token`: CSRF token returned from `/login`

**Success Response (200 OK):**
```json
{
  "ok": true,
  "user": {
    "id": "user-id-uuid",
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

**Error Responses:**
- 401: No session cookie → `{ "error": "No session cookie" }`
- 401: Invalid session → `{ "error": "Invalid session" }`
- 401: Session expired → `{ "error": "Session expired" }`
- 401: Not authenticated → `{ "error": "Not authenticated" }`
- 403: Missing CSRF token → `{ "error": "Missing XSRF token header" }`
- 403: Invalid CSRF token → `{ "error": "Invalid XSRF token" }`
- 404: User not found → `{ "error": "User not found" }`

**Example:**
```bash
curl -X GET http://localhost:8080/api/profile \
  -H "x-xsrf-token: <csrf-token-from-login>" \
  --cookie "sid=<session-id-from-login>"
```

---

## Authentication Flow

To access the profile endpoint, you must:

1. **Login** using `POST /login` to obtain:
   - Session cookie (`sid`)
   - CSRF token (`csrfToken` in response body)

2. **Include both** in subsequent profile requests:
   - Cookie automatically sent by browser or via `--cookie` in curl
   - CSRF token in `x-xsrf-token` or `x-csrf-token` header

**Complete Example:**

```bash
# Step 1: Login
LOGIN_RESPONSE=$(curl -i -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret"}')

# Extract session cookie and CSRF token from response
SESSION_COOKIE=$(echo "$LOGIN_RESPONSE" | grep -i "set-cookie" | sed 's/.*sid=\([^;]*\).*/\1/')
CSRF_TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"csrfToken":"[^"]*"' | sed 's/"csrfToken":"\(.*\)"/\1/')

# Step 2: Get profile
curl -X GET http://localhost:8080/api/profile \
  -H "x-xsrf-token: $CSRF_TOKEN" \
  --cookie "sid=$SESSION_COOKIE"
```

---

## Security Notes

- The `requireAuth` middleware validates both the session and CSRF token
- Sessions expire after a configured TTL (default 60 minutes, configurable via `SESSION_TTL_MINUTES`)
- CSRF protection prevents cross-site request forgery attacks
- The session cookie is HttpOnly to prevent XSS attacks
- For production, ensure the session cookie has `Secure` flag enabled (requires HTTPS)

---

## Environment Variables

- `COOKIE_NAME` - Name of session cookie (default: `sid`)
- `SESSION_TTL_MINUTES` - Session lifetime in minutes (default: `60`)

---

## Related Endpoints

- [POST /login](auth-routes.md#post-login) - Authenticate and get session
- [POST /logout](auth-routes.md#post-logout) - End session
