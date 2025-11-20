# Réseau TSI - Registration System

A complete authentication and registration system for Réseau TSI with email notifications.

## Features

- 🏢 Company (Structure) Registration
- 👤 Contributor (Intervenant) Registration  
- 🔐 Secure Login with Password Hashing
- ✉️ Email Verification with 6-Digit Code
- 📧 Welcome Email with Nodemailer
- 📊 User Dashboard with Profile Management
- ✏️ Edit Profile Information
- 🗄️ MySQL Database (XAMPP)
- 🎨 Modern UI with Tailwind CSS
- ⚡ Built with Next.js 16 & React 19

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MySQL (XAMPP) with Prisma ORM
- **Email:** Nodemailer
- **Authentication:** bcryptjs for password hashing

## Quick Start

### Prerequisites

- Node.js 18+ installed
- XAMPP installed and running
- pnpm installed (`npm install -g pnpm`)

### Installation

1. Clone the repository
2. Install dependencies:
   ```cmd
   pnpm install
   ```

3. Create database in phpMyAdmin:
   - Database name: `tsi`

4. Configure environment variables in `.env.local`:
   ```env
   DATABASE_URL="mysql://root:@localhost:3306/tsi"
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_FROM=noreply@reseau-tsi.com
   ```

5. Setup database:
   ```cmd
   pnpm prisma generate
   pnpm prisma db push
   ```

6. Run development server:
   ```cmd
   pnpm dev
   ```

7. Open http://localhost:3000

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/          # Authentication API routes
│   │   │   ├── register/  # User registration
│   │   │   ├── login/     # User login
│   │   │   ├── verify/    # Email verification
│   │   │   └── resend-code/ # Resend verification code
│   │   └── user/
│   │       └── update/    # Update user profile
│   ├── login/             # Login page
│   ├── register-company/  # Company registration
│   ├── register-contributor/ # Contributor registration
│   ├── verify-email/      # Email verification page
│   ├── dashboard/         # User dashboard
│   ├── forgot-password/   # Password reset page
│   └── choice-register/   # Registration type selection
├── components/            # Reusable UI components
├── lib/
│   ├── prisma.ts         # Prisma client
│   └── email.ts          # Email service
├── prisma/
│   └── schema.prisma     # Database schema
└── public/               # Static assets
```

## Database Schema

### User Table

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| email | String | Unique email |
| password | String | Hashed password |
| name | String | Full name |
| userType | String | "company" or "contributor" |
| isVerified | Boolean | Email verification status |
| verificationCode | String | 6-digit verification code |
| verificationCodeExpiry | DateTime | Code expiration time |
| firstName | String | First name |
| lastName | String | Last name |
| phone | String | Phone number |
| companyName | String | Company name (for companies) |
| service | String | Service/department |
| jobTitle | String | Job title |
| birthDate | String | Birth date (for contributors) |
| birthPlace | String | Birth place |
| birthCountry | String | Birth country |
| nationality | String | Nationality |
| siretNumber | String | SIRET number |
| address | String | Address |
| hasDriverLicense | Boolean | Driver license status |
| createdAt | DateTime | Creation timestamp |
| updatedAt | DateTime | Update timestamp |

## User Flow

1. **Registration** → User fills registration form
2. **Email Sent** → Receives 6-digit verification code
3. **Verification** → Enters code on verification page
4. **Welcome Email** → Receives welcome email after verification
5. **Login** → Logs in with credentials
6. **Dashboard** → Views and edits profile information

## API Endpoints

### POST /api/auth/register
Register a new user (company or contributor)

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe",
  "userType": "company",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "0123456789",
  "companyName": "My Company"
}
```

### POST /api/auth/verify
Verify email with 6-digit code

**Request Body:**
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

### POST /api/auth/resend-code
Resend verification code

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

### POST /api/auth/login
Authenticate user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

### PUT /api/user/update
Update user profile

**Request Body:**
```json
{
  "id": "user-uuid",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "0123456789",
  "companyName": "Updated Company"
}
```

## Documentation

- [Setup Guide](SETUP.md) - Detailed setup instructions
- [Email Verification Guide](EMAIL_VERIFICATION_GUIDE.md) - Email verification system
- [Dashboard Guide](DASHBOARD_GUIDE.md) - User dashboard features
- [Deployment Guide](DEPLOYMENT.md) - How to deploy to production

## Development Commands

```cmd
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm prisma studio # Open Prisma Studio (database GUI)
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | MySQL connection string | mysql://root:@localhost:3306/tsi |
| EMAIL_HOST | SMTP host | smtp.gmail.com |
| EMAIL_PORT | SMTP port | 587 |
| EMAIL_USER | Email username | your-email@gmail.com |
| EMAIL_PASSWORD | Email password/app password | your-app-password |
| EMAIL_FROM | From email address | noreply@reseau-tsi.com |

## License

Private project for Réseau TSI

## Support

For issues or questions, contact the development team.
