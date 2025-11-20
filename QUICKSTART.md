# Quick Start Guide - 5 Minutes Setup

## Step 1: Start XAMPP (1 min)
1. Open XAMPP Control Panel
2. Click "Start" for Apache
3. Click "Start" for MySQL
4. Open browser: http://localhost/phpmyadmin
5. Click "New" → Database name: `tsi` → Click "Create"

## Step 2: Install & Setup (2 min)
Open terminal in project folder:

```cmd
pnpm install
pnpm prisma generate
pnpm prisma db push
```

## Step 3: Configure Email (1 min)
Edit `.env.local` file:

```env
DATABASE_URL="mysql://root:@localhost:3306/tsi"
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
EMAIL_FROM=noreply@reseau-tsi.com
```

**Get Gmail App Password:**
1. Go to: https://myaccount.google.com/apppasswords
2. Create app password
3. Copy and paste in `.env.local`

## Step 4: Run (1 min)
```cmd
pnpm dev
```

Open: http://localhost:3000

## Test It!
1. Click "Créer un compte"
2. Choose "Structure" or "Intervenant"
3. Fill the form
4. Submit
5. Check your email for welcome message
6. Login with your credentials

## Done! 🎉

## Troubleshooting

**Port 3000 already in use?**
```cmd
pnpm dev -- -p 3001
```

**Database connection error?**
- Make sure XAMPP MySQL is running
- Check database name is `tsi`
- Verify `.env.local` has correct connection string

**Email not sending?**
- Check Gmail App Password is correct
- Make sure 2FA is enabled on Gmail
- Check console for error messages

**Prisma errors?**
```cmd
pnpm prisma generate
pnpm prisma db push --force-reset
```

## View Database
```cmd
pnpm prisma studio
```
Opens GUI at http://localhost:5555

Or use phpMyAdmin: http://localhost/phpmyadmin
