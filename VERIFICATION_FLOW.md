# Email Verification Flow Diagram

## Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                    REGISTRATION PROCESS                          │
└─────────────────────────────────────────────────────────────────┘

1. User Registration
   ┌──────────────────┐
   │ User fills form  │
   │ (Company/        │
   │  Contributor)    │
   └────────┬─────────┘
            │
            ▼
   ┌──────────────────┐
   │ POST /api/auth/  │
   │    register      │
   └────────┬─────────┘
            │
            ├─── Generate 6-digit code
            ├─── Set expiry (15 min)
            ├─── Save to database (isVerified: false)
            └─── Send verification email
            │
            ▼
   ┌──────────────────┐
   │ Redirect to      │
   │ /verify-email    │
   └──────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                    VERIFICATION PROCESS                          │
└─────────────────────────────────────────────────────────────────┘

2. Email Verification
   ┌──────────────────┐
   │ User receives    │
   │ email with code  │
   │   123456         │
   └────────┬─────────┘
            │
            ▼
   ┌──────────────────┐
   │ User enters code │
   │ on verification  │
   │ page             │
   └────────┬─────────┘
            │
            ▼
   ┌──────────────────┐
   │ POST /api/auth/  │
   │    verify        │
   └────────┬─────────┘
            │
            ├─── Check code matches
            ├─── Check not expired
            ├─── Update isVerified: true
            ├─── Clear verification code
            └─── Send welcome email
            │
            ▼
   ┌──────────────────┐
   │ Show success     │
   │ message          │
   │ ✅ Verified!     │
   └────────┬─────────┘
            │
            ▼
   ┌──────────────────┐
   │ Auto-redirect    │
   │ to /login        │
   │ (after 3 sec)    │
   └──────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                       LOGIN PROCESS                              │
└─────────────────────────────────────────────────────────────────┘

3. User Login
   ┌──────────────────┐
   │ User enters      │
   │ credentials      │
   └────────┬─────────┘
            │
            ▼
   ┌──────────────────┐
   │ POST /api/auth/  │
   │    login         │
   └────────┬─────────┘
            │
            ├─── Check email exists
            ├─── Verify password
            └─── Check isVerified
            │
            ├─── If NOT verified ──┐
            │                       │
            │                       ▼
            │              ┌──────────────────┐
            │              │ Redirect to      │
            │              │ /verify-email    │
            │              └──────────────────┘
            │
            └─── If verified ──────┐
                                   │
                                   ▼
                          ┌──────────────────┐
                          │ Login successful │
                          │ Access granted   │
                          └──────────────────┘


┌───────────────────────────────────────────────────────────