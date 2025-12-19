# Campaign Routes API Documentation

This document describes the campaign management HTTP API endpoints.

**Base Path:** `/campaign` (or as mounted in your app)

---

## GET /categories

**Description:** Get all available campaign categories (enum values).

**Success Response (200 OK):**
```json
{
  "categories": [
    "HEALTH",
    "EDUCATION",
    "DISASTER_RELIEF",
    "COMMUNITY",
    "ENVIRONMENT",
    "ANIMALS",
    "OTHER"
  ]
}
```

**Example:**
```bash
curl -X GET http://localhost:8080/campaign/categories
```

---

## POST /createcampaign

**Description:** Create a new campaign with media files, links, and milestones. Requires authentication - the creator ID is automatically set from the logged-in user.

**Authentication Required:** Yes

**Required Headers:**
- Cookie: `sid` (session ID cookie from login)
- `x-xsrf-token` or `x-csrf-token`: CSRF token returned from `/login`

**Content-Type:** `multipart/form-data`

**Form Fields:**
- `title` (required): Campaign title (string)
- `category` (required): Campaign category (enum: MEDICAL, DISASTER, EDUCATION, HOUSING, LIVELIHOOD, OTHER)
- `description` (required): Campaign description (string)
- `location` (optional): Campaign location (string)
- `links` (optional): JSON string array of link objects: `[{"label": "string", "url": "string"}]`
- `media` (optional): Upload up to 5 image/video files

**Success Response (201 Created):**
```json
{
  "id": "campaign-id",
  "title": "Save the Community Center",
  "category": "HOUSING",
  "location": "New York",
  "description": "Help us rebuild our community center",
  "creatorId": "user-id",
  "status": "DRAFT",
  "createdAt": "2025-12-19T12:00:00.000Z",
  "updatedAt": "2025-12-19T12:00:00.000Z",
  "media": [
    {
      "url": "/uploads/filename.jpg",
      "type": "IMAGE"
    }
  ],
  "links": [
    {
      "id": "link-id",
      "label": "Website",
      "url": "https://example.com",
      "userId": "user-id",
      "campaignId": "campaign-id",
      "createdAt": "2025-12-19T12:00:00.000Z"
    }
  ],
  "milestones": []
}
```

**Error Responses:**
- 401: Not authenticated → `{ "error": "Not authenticated" }`
- 400: Missing required fields → `{ "error": "Missing required fields: title, category, description" }`
- 400: Invalid JSON format → `{ "error": "Invalid JSON format for links. Expected format: [{"label":"string","url":"string"}]", "received": "..." }`

**Example (curl):**
```bash
curl -X POST http://localhost:8080/campaign/createcampaign \
  -H "x-xsrf-token: YOUR_CSRF_TOKEN" \
  --cookie "sid=YOUR_SESSION_ID" \
  -F "title=Save the Community Center" \
  -F "category=HOUSING" \
  -F "description=Help us rebuild our community center" \
  -F "location=New York" \
  -F 'links=[{"label":"Website","url":"https://example.com"}]' \
  -F "media=@photo1.jpg" \
  -F "media=@photo2.jpg"
```

**Example (Postman/Insomnia):**
1. Set method to POST: `http://localhost:8080/campaign/createcampaign`
2. Add Headers:
   - `x-xsrf-token`: `<your-csrf-token>`
   - Cookie: `sid=<your-session-id>`
3. Body → form-data:
   ```
   title: Save the Community Center
   category: HOUSING
   description: Help us rebuild our community center
   location: New York
   links: [{"label":"Website","url":"https://example.com"}]
   media: [select files]
   ```

**Example (JavaScript/Fetch):**
```javascript
const formData = new FormData();
formData.append('title', 'Save the Community Center');
formData.append('category', 'HOUSING');
formData.append('description', 'Help us rebuild our community center');
formData.append('location', 'New York');
formData.append('links', JSON.stringify([
  { label: 'Website', url: 'https://example.com' }
]));

// Add files
const fileInput = document.querySelector('input[type="file"]');
for (let file of fileInput.files) {
  formData.append('media', file);
}

fetch('http://localhost:8080/campaign/createcampaign', {
  method: 'POST',
  headers: {
    'x-xsrf-token': csrfToken // from login response
  },
  credentials: 'include', // sends cookies automatically
  body: formData
});
```

**Important Notes:**
- ❌ **DO NOT send `creatorId`** - it's automatically set from the authenticated user
- ✅ Must be logged in with valid session
- ✅ `category` must be one of: MEDICAL, DISASTER, EDUCATION, HOUSING, LIVELIHOOD, OTHER
- ✅ `links` must be valid JSON array string (if provided)
- ✅ `media` files are stored in `/uploads` directory
- ✅ Campaign status is automatically set to `DRAFT`

---

## GET /getcampaign

**Description:** Get all campaigns with basic information and media.

**Success Response (200 OK):**
```json
[
  {
    "id": "campaign-id",
    "title": "Campaign Title",
    "category": "HEALTH",
    "location": "Location",
    "description": "Description",
    "status": "ACTIVE",
    "createdAt": "2025-12-19T12:00:00.000Z",
    "updatedAt": "2025-12-19T12:00:00.000Z",
    "creator": {
      "name": "Creator Name",
      "email": "creator@example.com"
    },
    "media": [
      {
        "id": "media-id",
        "url": "/uploads/filename.jpg",
        "type": "IMAGE"
      }
    ]
  }
]
```

**Notes:**
- Campaigns are ordered by creation date (most recent first)

**Example:**
```bash
curl -X GET http://localhost:8080/campaign/getcampaign
```

---

## GET /getcampaign/:id

**Description:** Get a single campaign by ID with full details including media, links, milestones, and creator info.

**URL Parameters:**
- `id` (required): Campaign ID

**Success Response (200 OK):**
```json
{
  "id": "campaign-id",
  "title": "Campaign Title",
  "category": "EDUCATION",
  "location": "Boston",
  "description": "Full description",
  "status": "ACTIVE",
  "creatorId": "user-id",
  "createdAt": "2025-12-19T12:00:00.000Z",
  "updatedAt": "2025-12-19T12:00:00.000Z",
  "creator": {
    "name": "Creator Name",
    "email": "creator@example.com"
  },
  "media": [...],
  "links": [...],
  "milestones": [...]
}
```

**Error Responses:**
- 400: Missing campaign ID → `{ "error": "Campaign ID is required" }`
- 404: Campaign not found → `{ "error": "Campaign not found" }`

**Example:**
```bash
curl -X GET http://localhost:8080/campaign/getcampaign/campaign-123
```

---

## PUT /getcampaign/:id

**Description:** Update an existing campaign's basic information. Only the campaign creator can update their own campaign.

**Authentication Required:** Yes

**Required Headers:**
- Cookie: `sid` (session ID cookie from login)
- `x-xsrf-token` or `x-csrf-token`: CSRF token returned from `/login`

**URL Parameters:**
- `id` (required): Campaign ID

**Request Body (JSON):**
```json
{
  "title": "Updated Title",
  "category": "ENVIRONMENT",
  "location": "Seattle",
  "description": "Updated description",
  "status": "ACTIVE"
}
```

**Success Response (200 OK):**
```json
{
  "id": "campaign-id",
  "title": "Updated Title",
  "category": "ENVIRONMENT",
  "location": "Seattle",
  "description": "Updated description",
  "status": "ACTIVE",
  "creatorId": "user-id",
  "c1: Not authenticated → `{ "error": "Not authenticated" }`
- 400: Missing campaign ID → `{ "error": "Campaign ID is required" }`
- 403: Not authorized → `{ "error": "Not authorized to update this campaign" }`
- 404: Campaign not found → `{ "error": "Campaign not found" }`

**Notes:**
- All fields in the request body are optional; only provided fields will be updated
- Only the campaign creator can update their campaign
- Categories: MEDICAL, DISASTER, EDUCATION, HOUSING, LIVELIHOOD, OTHER

**Example:**
```bash
curl -X PUT http://localhost:8080/campaign/getcampaign/campaign-123 \
  -H "Content-Type: application/json" \
  -H "x-xsrf-token: YOUR_CSRF_TOKEN" \
  --cookie "sid=YOUR_SESSION_ID" \
  -d '{"title":"Updated Title","status":"Ll; only provided fields will be updated

**Example:**
```bash
curl -X PUT http://localhost:8080/campaign/getcampaign/campaign-123 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title","status":"ACTIVE"}'
``` Only the campaign creator can delete their own campaign.

**Authentication Required:** Yes

**Required Headers:**
- Cookie: `sid` (session ID cookie from login)
- `x-xsrf-token` or `x-csrf-token`: CSRF token returned from `/login`

**URL Parameters:**
- `id` (required): Campaign ID

**Success Response (200 OK):**
```json
{
  "message": "Campaign deleted successfully"
}
```

**Error Responses:**
- 401: Not authenticated → `{ "error": "Not authenticated" }`
- 400: Missing campaign ID → `{ "error": "Campaign ID is required" }`
- 403: Not authorized → `{ "error": "Not authorized to delete this campaign" }`
- 404: Campaign not found → `{ "error": "Campaign not found" }`

**Example:**
```bash
curl -X DELETE http://localhost:8080/campaign/getcampaign/campaign-123 \
  -H "x-xsrf-token: YOUR_CSRF_TOKEN" \
  --cookie "sid=YOUR_SESSION_ID"
- 400: Missing campaign ID → `{ "error": "Campaign ID is required" }`
- 404: Campaign not found → `{ "error": "Campaign not found" }`

**Example:**
```bash
curl -X DELETE http://localhost:8080/campaign/getcampaign/campaign-123
```

---

## POST /upload/test

**Description:** Test endpoint for uploading multiple media files.

**Content-Type:** `multipart/form-data`

**Form Fields:**
- `media`: Upload up to 5 files

**Success Response (200 OK):**
```json
{
  "message": "Files uploaded successfully",
  "files": [
    {
      "fieldname": "media",
      "originalname": "photo.jpg",
      "filename": "1234567890-photo.jpg",
      "path": "uploads/1234567890-photo.jpg",
      "size": 123456
    }
  ]
}
```

**Example:**
```bash
curl -X POST http://localhost:8080/campaign/upload/test \
  -MEDICAL` - Medical and healthcare causes
- `DISASTER` - Disaster relief and emergency response
- `EDUCATION` - Educational initiatives
- `HOUSING` - Housing and shelter projects
- `LIVELIHOOD` - Livelihood and economic development
## Campaign Status Values

- `DRAFT` - Campaign is being created (default for new campaigns)
- `ACTIVE` - Campaign is live and accepting donations
- `PAUSED` - Campaign is temporarily paused
- `COMPLETED` - Campaign goal has been reached
- `CANCELLED` - Campaign has been cancelled

## Campaign Category Values

- `HEALTH` - Medical and healthcare causes
- `EDUCATION` - Educational initiatives
- `DISASTER_RELIEF` - Emergency and disaster relief
- `COMMUNITY` - Community development projects
- `ENVIRONMENT` - Environmental causes
- `ANIMALS` - Animal welfare
- `OTHER` - Other causes

## Media Upload Notes

- Maximum 5 files per upload
- Supported types: Images (JPEG, PNG, etc.) and Videos
- Files are stored in the `/uploads` directory
- Media type is automatically detected based on MIME type
