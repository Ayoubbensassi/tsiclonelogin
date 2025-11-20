# Dashboard System - User Guide

## Overview
After successful login and email verification, users are redirected to a personalized dashboard where they can view and edit their profile information.

## Features

### 1. Dashboard Home (`/dashboard`)
The main dashboard displays:
- Welcome message with user's name
- Account verification status badge
- Three stat cards showing:
  - Account status (Verified)
  - Account type (Company/Contributor)
  - Member since date
- Complete profile information
- Edit profile functionality
- Logout button

### 2. Profile Viewing
Users can view all their registration information:

#### For Company Accounts:
- First Name & Last Name
- Email & Phone
- Company Name
- Service/Department
- Job Title
- Registration Date

#### For Contributor Accounts:
- First Name & Last Name
- Email & Phone
- Birth Date & Place
- Birth Country
- Nationality
- SIRET Number
- Address
- Driver's License Status
- Registration Date

### 3. Profile Editing
Users can edit their profile information:
- Click "Modifier" button to enter edit mode
- All fields become editable (except email)
- Click "Enregistrer" to save changes
- Click "Annuler" to cancel without saving
- Changes are saved to database and localStorage

### 4. Session Management
- User data is stored in localStorage after login
- Dashboard checks for valid session on load
- Redirects to login if no session found
- Logout clears session and redirects to login

## Technical Implementation

### New Files Created

#### `/app/dashboard/page.tsx`
Main dashboard component with:
- User authentication check
- Profile view mode
- Profile edit mode
- Stats cards
- Responsive layout

#### `/app/api/user/update/route.ts`
API endpoint for updating user profile:
- PUT method
- Validates user ID
- Updates all editable fields
- Returns updated user data

### Updated Files

#### `/app/login/page.tsx`
- Saves user data to localStorage on successful login
- Redirects to `/dashboard` instead of `/choice-register`

### Data Flow

```
Login Success
    ↓
Save user to localStorage
    ↓
Redirect to /dashboard
    ↓
Dashboard loads user from localStorage
    ↓
Display profile information
    ↓
User clicks "Modifier"
    ↓
Edit mode activated
    ↓
User updates fields
    ↓
Click "Enregistrer"
    ↓
PUT /api/user/update
    ↓
Update database
    ↓
Update localStorage
    ↓
Return to view mode
```

## UI Components

### Header
- Logo and app name
- Logout button
- Clean white background with shadow

### Welcome Banner
- Gradient purple-to-blue background
- User avatar icon (Building for company, User for contributor)
- Welcome message with user's first name
- Account type badge
- Verification status indicator

### Stats Cards
Three cards displaying:
1. Account Status (Green gradient)
2. Account Type (Blue gradient)
3. Member Since (Purple gradient)

### Profile Card
- White background with shadow
- Two-column grid layout (responsive)
- View mode: Read-only fields with labels
- Edit mode: Editable input fields
- Action buttons (Edit/Save/Cancel)

## User Experience

### First Login
1. User logs in successfully
2. Sees "Connexion réussie!" message
3. Redirected to dashboard
4. Sees welcome banner with their name
5. Views their complete profile

### Editing Profile
1. Click "Modifier" button
2. All fields become editable
3. Make changes
4. Click "Enregistrer"
5. See success message
6. Profile updates immediately

### Logout
1. Click "Déconnexion" button
2. Session cleared
3. Redirected to login page

## Security Features

- Email cannot be changed (read-only in edit mode)
- Password not displayed or editable from dashboard
- Session validation on page load
- Automatic redirect if not authenticated
- User ID required for all updates

## Responsive Design

The dashboard is fully responsive:
- Mobile: Single column layout
- Tablet: Two-column grid for profile fields
- Desktop: Full three-column stats cards

## Future Enhancements

Possible improvements:
- Change password functionality
- Profile picture upload
- Activity history/logs
- Notification preferences
- Two-factor authentication settings
- Export profile data
- Delete account option
- Dark mode toggle
- Email preferences
- Privacy settings

## Testing the Dashboard

1. Register a new account
2. Verify email with code
3. Log in with credentials
4. View dashboard with your information
5. Click "Modifier" to edit profile
6. Update some fields
7. Click "Enregistrer" to save
8. Verify changes are persisted
9. Logout and login again
10. Confirm changes are still there

## API Endpoints

### GET (via localStorage)
User data is retrieved from localStorage on dashboard load

### PUT `/api/user/update`
Updates user profile information

Request body:
```json
{
  "id": "user-uuid",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+33123456789",
  "companyName": "My Company",
  "service": "IT",
  "jobTitle": "Developer"
}
```

Response:
```json
{
  "message": "Profil mis à jour avec succès",
  "user": {
    "id": "user-uuid",
    "email": "john@example.com",
    "name": "John Doe",
    "firstName": "John",
    "lastName": "Doe",
    ...
  }
}
```

## Styling

The dashboard uses:
- Tailwind CSS for styling
- Gradient backgrounds (purple to blue)
- Shadow effects for depth
- Rounded corners for modern look
- Responsive grid layouts
- Custom color palette matching the brand

## Icons

Using Lucide React icons:
- `User` - User profile
- `Building2` - Company profile
- `LogOut` - Logout button
- `Edit` - Edit profile
- `Save` - Save changes
- `X` - Cancel editing

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Fast page loads with localStorage
- No unnecessary API calls
- Optimistic UI updates
- Minimal re-renders
- Efficient state management
