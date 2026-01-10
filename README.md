# Medical Clinic Website

A production-ready corporate medical clinic website with a public-facing website and secure admin panel.

## Tech Stack

### Backend
- Node.js with Express.js
- TypeScript
- PostgreSQL with Prisma ORM
- JWT Authentication
- Multer for file uploads

### Frontend
- React.js with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- React Quill for rich text editing
- Axios for API calls

## Project Structure

```
.
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── config/
│   │   └── types/
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/medical_clinic?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV=development
UPLOAD_DIR="./uploads"
FRONTEND_URL="http://localhost:3000"
```

4. Generate Prisma client:
```bash
npm run prisma:generate
```

5. Run database migrations:
```bash
npm run prisma:migrate
```

6. (Optional) Create an admin user. You can use Prisma Studio:
```bash
npm run prisma:studio
```

Or create a seed script to add an initial admin user.

7. Start the development server:
```bash
npm run dev
```

The backend API will be available at `http://localhost:4000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```env
VITE_API_URL=http://localhost:4000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Creating an Admin User

To create an admin user, you can use Prisma Studio or create a seed script. Here's a simple Node.js script:

```javascript
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('your-password', 10);
  
  const user = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
    },
  });
  
  console.log('Admin user created:', user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

## Features

### Public Website
- **Home Page**: Hero section, doctor introduction, experience highlights, specialties, latest blog posts
- **About Page**: Detailed biography, education, certifications
- **Services**: List and detail pages for medical services
- **Blog**: Paginated blog feed with cover images, blog detail pages with rich text content
- **Contact**: Clinic information, Google Maps embed, contact form

### Admin Panel
- **Authentication**: Secure JWT-based login
- **Blog Management**: Create, edit, delete, and publish blog posts
- **Rich Text Editor**: Full-featured editor for blog content
- **Image Upload**: Upload and manage cover images for blog posts
- **Draft System**: Save drafts and publish when ready

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Blog
- `GET /api/blog` - Get all blog posts (with pagination)
- `GET /api/blog/:slug` - Get blog post by slug
- `GET /api/blog/id/:id` - Get blog post by ID (admin only)
- `POST /api/blog` - Create blog post (admin only)
- `PUT /api/blog/:id` - Update blog post (admin only)
- `DELETE /api/blog/:id` - Delete blog post (admin only)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:slug` - Get service by slug
- `POST /api/services` - Create service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

### Media
- `GET /api/media` - Get all media files (admin only)
- `POST /api/media/upload` - Upload media file (admin only)
- `DELETE /api/media/:id` - Delete media file (admin only)

## Production Deployment

### Backend
1. Build the TypeScript code:
```bash
npm run build
```

2. Set production environment variables
3. Run database migrations
4. Start the server:
```bash
npm start
```

### Frontend
1. Build for production:
```bash
npm run build
```

2. The `dist` folder contains the production build
3. Serve with a web server like Nginx or deploy to a hosting service

### Environment Variables

Make sure to set appropriate environment variables for production:
- Use a strong `JWT_SECRET`
- Set `NODE_ENV=production`
- Configure proper `DATABASE_URL`
- Set `FRONTEND_URL` to your production frontend URL
- Configure `UPLOAD_DIR` for file storage

## Database Schema

The application uses the following main models:
- **User**: Admin users for authentication
- **BlogPost**: Blog posts with rich text content
- **Service**: Medical services offered
- **Media**: Uploaded media files

## Security Considerations

- JWT tokens for authentication
- Password hashing with bcrypt
- Input validation with express-validator
- CORS configuration
- File upload restrictions (type and size)

## License

This project is proprietary software.

