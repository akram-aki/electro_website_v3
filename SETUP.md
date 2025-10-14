# Club Registration Setup Guide

## Database Setup (Neon)

1. **Create a Neon Database:**
   - Go to [Neon Console](https://console.neon.tech/)
   - Create a new project
   - Copy your connection string

2. **Run the SQL Schema:**
   ```sql
   -- Use the PostgreSQL version from club_registrations_table.sql
   CREATE TABLE club_registrations (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       family_name VARCHAR(100) NOT NULL,
       email VARCHAR(255) NOT NULL UNIQUE,
       phone VARCHAR(20) NOT NULL,
       student_card_number VARCHAR(50) NOT NULL UNIQUE,
       gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female')),
       year_of_studies VARCHAR(5) NOT NULL CHECK (year_of_studies IN ('L1', 'L2', 'L3', 'M1', 'M2')),
       major VARCHAR(100) NOT NULL,
       faculty VARCHAR(150) NOT NULL,
       motivation TEXT NOT NULL,
       status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE INDEX idx_email ON club_registrations(email);
   CREATE INDEX idx_student_card ON club_registrations(student_card_number);
   CREATE INDEX idx_status ON club_registrations(status);
   CREATE INDEX idx_created_at ON club_registrations(created_at);
   ```

## Environment Variables

### For Local Development:
Create a `.env` file in the root directory:
```
DATABASE_URL=postgresql://username:password@hostname/database?sslmode=require
ADMIN_TOKEN=your-secure-admin-token-here
```

### For Vercel Deployment:
Add these environment variables in your Vercel dashboard:
- `DATABASE_URL` - Your Neon database connection string
- `ADMIN_TOKEN` - A secure random token for admin access

## API Endpoints

### POST `/api/club-registrations`
Submit a new club registration.

**Body:**
```json
{
  "name": "John",
  "familyName": "Doe", 
  "email": "john.doe@example.com",
  "phone": "+213123456789",
  "studentCardNumber": "20241234",
  "gender": "male",
  "yearOfStudies": "L3",
  "major": "Electronics",
  "faculty": "Faculty of Technology",
  "motivation": "I want to join because..."
}
```

### GET `/api/club-registrations`
Fetch all registrations (Admin only - requires Authorization header).

**Headers:**
```
Authorization: Bearer your-admin-token
```

## Deployment

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Usage

- Visit `/join` to access the registration form
- Submitted registrations are stored in your Neon database
- Use the GET endpoint with admin token to view all registrations
