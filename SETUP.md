# Backend Setup Instructions (XAMPP MySQL)

## 1. Setup XAMPP Database

1. Start XAMPP Control Panel
2. Start Apache and MySQL services
3. Open phpMyAdmin: http://localhost/phpmyadmin
4. Create database:
   - Click "New" in left sidebar
   - Database name: `tsi`
   - Collation: `utf8mb4_unicode_ci`
   - Click "Create"

## 2. Install Dependencies

```cmd
pnpm install
```

## 3. Configure Email (Nodemailer)

Edit `.env.local` file with your email credentials:

### For Gmail:
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password: https://myaccount.google.com/apppasswords
4. Update `.env.local`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password-here
EMAIL_FROM=noreply@reseau-tsi.com
```

### For Other Email Providers:
- **Outlook/Hotmail**: smtp-mail.outlook.com, port 587
- **Yahoo**: smtp.mail.yahoo.com, port 587
- **Custom SMTP**: Use your provider's settings

## 4. Setup Database Tables

Initialize Prisma and create tables in MySQL:

```cmd
pnpm prisma generate
pnpm prisma db push
```

This will create the `User` table in your `tsi` database with all fields

## 5. Run the Application

Development mode:
```cmd
pnpm dev
```

Production build:
```cmd
pnpm build
pnpm start
```

## 6. Test the System

1. Go to http://localhost:3000
2. Click "Créer un compte"
3. Register as either Structure or Intervenant
4. Check your email for the welcome message
5. Login with your credentials

## Database Management

View/edit database:
```cmd
pnpm prisma studio
```

Reset database (delete all data):
```cmd
pnpm prisma db push --force-reset
```

Or manually in phpMyAdmin:
- Go to http://localhost/phpmyadmin
- Select `tsi` database
- Drop and recreate tables

## Troubleshooting

### Email not sending:
- Check your email credentials in `.env.local`
- Make sure 2FA is enabled and you're using an App Password (for Gmail)
- Check console for error messages

### Database errors:
- Delete `prisma/dev.db` and run `pnpm prisma db push` again
- Make sure you ran `pnpm prisma generate`

### Port already in use:
- Change port: `pnpm dev -- -p 3001`
