# SmartWish Survey Backend

A standalone NestJS backend service for handling SmartWish store interest surveys and partnership submissions.

## 🌟 Features

- **Store Interest Submissions** - Public API for store partnership applications
- **Image Upload** - Support for uploading store images
- **Letter Generation** - Automatic professional letter creation
- **Statistics** - Dashboard data for submissions
- **Secure Database** - Supabase PostgreSQL integration
- **Rate Limiting** - Protection against abuse
- **File Management** - Static file serving

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Access to Supabase database

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment:**
```bash
cp env.example .env
# Edit .env with your database credentials
```

3. **Apply database migration:**
- Go to Supabase Dashboard: https://supabase.com/dashboard/project/lzeuerapdbrouxteluww
- Run SQL from: `migrations/001_create_store_interests.sql`

4. **Build and start:**
```bash
npm run build
npm start
```

### Development

```bash
npm run start:dev  # Watch mode
npm run start:debug  # Debug mode
```

## 🗄️ Database Configuration

### Environment Variables

```env
# Application
NODE_ENV=development
PORT=3002

# Database (Supabase)
DB_HOST=db.lzeuerapdbrouxteluww.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-password
DB_NAME=postgres

# Supabase
SUPABASE_URL=https://lzeuerapdbrouxteluww.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Security
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
RATE_LIMIT_MAX_REQUESTS=100
```

## 📡 API Endpoints

### Store Interests

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/store-interests` | Submit store interest | ❌ |
| GET | `/store-interests` | Get all submissions | ❌ |
| GET | `/store-interests/stats` | Get statistics | ❌ |
| GET | `/store-interests/:id` | Get specific submission | ❌ |
| POST | `/store-interests/:id/images` | Upload images | ❌ |

### Utility

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Service info |
| GET | `/health` | Health check |

### Submit Store Interest

```bash
POST /store-interests
Content-Type: application/json

{
  "storeName": "My Store",
  "storeAddress": "123 Main St, City, State 12345",
  "contactName": "John Doe",
  "contactEmail": "john@store.com",
  "contactPhone": "+1-555-123-4567"
}
```

### Upload Images

```bash
POST /store-interests/:id/images
Content-Type: multipart/form-data

images: [file1.jpg, file2.png, ...]
```

## 🏗️ Architecture

### Project Structure

```
survey_backend/
├── src/
│   ├── config/
│   │   └── database.config.ts
│   ├── store-interests/
│   │   ├── store-interest.entity.ts
│   │   ├── store-interest-image.entity.ts
│   │   ├── store-interests.service.ts
│   │   ├── store-interests.controller.ts
│   │   └── store-interests.module.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts
├── migrations/
│   └── 001_create_store_interests.sql
├── uploads/
│   └── store-interests/
├── package.json
└── README.md
```

### Database Schema

#### `sw_store_interests`
- `id` (UUID) - Primary key
- `store_name` (VARCHAR) - Store name
- `store_address` (VARCHAR) - Full address
- `contact_name` (VARCHAR) - Contact person
- `contact_email` (VARCHAR) - Email (optional)
- `contact_phone` (VARCHAR) - Phone (optional)
- `letter_text` (TEXT) - Generated letter
- `created_at` (TIMESTAMPTZ) - Creation time
- `updated_at` (TIMESTAMPTZ) - Last update

#### `sw_store_interest_images`
- `id` (UUID) - Primary key
- `store_interest_id` (UUID) - Foreign key
- `image_url` (VARCHAR) - File path
- `original_name` (VARCHAR) - Original filename
- `created_at` (TIMESTAMPTZ) - Upload time

## 🔒 Security Features

- **Rate Limiting** - 100 requests per 15 minutes
- **CORS Protection** - Configurable allowed origins
- **Helmet Security** - Security headers
- **File Validation** - Image-only uploads
- **Input Validation** - Required field checks
- **SQL Injection Protection** - TypeORM parameterized queries

## 📊 Monitoring

### Health Check
```bash
GET /health
{
  "status": "ok",
  "service": "survey-backend",
  "time": "2025-08-15T14:30:00.000Z",
  "version": "1.0.0"
}
```

### Statistics
```bash
GET /store-interests/stats
{
  "totalInterests": 15,
  "totalImages": 8,
  "recentSubmissions": [...]
}
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start:prod
```

### Environment
- Set `NODE_ENV=production`
- Configure production database credentials
- Set up proper CORS origins
- Configure rate limiting

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 3002
CMD ["npm", "run", "start:prod"]
```

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection**
   - Verify credentials in `.env`
   - Check Supabase project status
   - Ensure SSL is enabled

2. **File Uploads**
   - Check upload directory permissions
   - Verify file size limits
   - Ensure image MIME types

3. **CORS Errors**
   - Add frontend URL to `CORS_ORIGIN`
   - Check preflight requests

## 📈 Performance

- **Connection Pooling** - Max 5 concurrent connections
- **File Size Limits** - 10MB per image
- **Rate Limiting** - Prevents abuse
- **Static File Serving** - Efficient image delivery

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Add tests
4. Submit pull request

## 📄 License

MIT License - See LICENSE file for details
