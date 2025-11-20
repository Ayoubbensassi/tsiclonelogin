# Email Verification System - Implementation Guide

## Overview
The project now includes a complete email verification system. Users must verify their email address with a 6-digit code before they can log in.

## How It Works

### 1. Registration Flow
- User fills out registration form (Company or Contributor)
- System creates unverified account (`isVerified: false`)
- System generates a 6-digit verification code
- Code is valid for 15 minutes
- Verification email is sent with the code
- User is redirected to `/verify-email` page

### 2. Verification Flow
- User enters the 6-digit code received via email
- System validates the code and expiration time
- If valid, account is marked as verified (`isVerified: true`)
- Welcome email is sent to the user
- User is redirected to login page

### 3. Login Flow
- User attempts to log in
- System checks if account is verified
- If not verified, user is redirected to verification page
- If verified, login proceeds normally

## New Features

### Database Changes
Added to `User` model in `prisma/schema.prisma`:
- `isVerified` (Boolean) - Account verification status
- `verificationCode` (String) - 6-digit code
- `verificationCodeExpiry` (DateTime) - Code expiration time

### New API Endpoints

#### POST `/api/auth/verify`
Verifies the email with the provided code.
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

#### POST `/api/auth/resend-code`
Resends a new verification code to the user's email.
```json
{
  "email": "user@example.com"
}
```

### New Pages

#### `/verify-email`
- Clean UI with 6 input boxes for the code
- Auto-focus on next input
- Paste support for full 6-digit code
- Resend code button
- Error handling
- Success state with auto-redirect

### Email Templates

#### Verification Email
- Contains 6-digit code in large, easy-to-read format
- Shows expiration time (15 minutes)
- Security warning not to share the code

#### Welcome Email (Updated)
- Sent after successful verification
- Confirms account is verified
- Includes login link

## User Experience

### Registration
1. User completes registration form
2. Sees message: "Inscription réussie! Vérifiez votre email."
3. Redirected to verification page

### Verification Page
1. User sees their email address
2. Enters 6-digit code from email
3. Can paste code directly
4. Can resend code if not received
5. Sees success message when verified
6. Auto-redirected to login after 3 seconds

### Login
1. If account not verified, sees message
2. Automatically redirected to verification page
3. Can verify and then log in

## Security Features

- Codes expire after 15 minutes
- Codes are single-use (cleared after verification)
- Failed verification attempts show clear error messages
- Unverified users cannot log in
- Verification status is checked on every login

## Testing the System

1. Register a new account (Company or Contributor)
2. Check your email for the 6-digit code
3. Enter the code on the verification page
4. Receive welcome email
5. Log in with verified account

## Configuration

Make sure your `.env` file has email settings:
```env
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-password
EMAIL_FROM="Réseau TSI <noreply@example.com>"
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Files Modified

### Database
- `prisma/schema.prisma` - Added verification fields

### API Routes
- `app/api/auth/register/route.ts` - Generate and send verification code
- `app/api/auth/login/route.ts` - Check verification status
- `app/api/auth/verify/route.ts` - NEW: Verify code
- `app/api/auth/resend-code/route.ts` - NEW: Resend verification code

### Pages
- `app/register-company/page.tsx` - Redirect to verification
- `app/register-contributor/page.tsx` - Redirect to verification
- `app/login/page.tsx` - Handle unverified accounts
- `app/verify-email/page.tsx` - NEW: Verification page

### Utilities
- `lib/email.ts` - Added verification email template, updated welcome email

## Future Enhancements

Possible improvements:
- Rate limiting on code resend
- Account lockout after too many failed attempts
- SMS verification as alternative
- Remember device to skip verification
- Admin panel to manually verify accounts
