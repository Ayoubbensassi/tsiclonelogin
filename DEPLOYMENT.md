# Deployment Guide

## Push to GitHub

### 1. Initialize Git (if not already done)

```cmd
git init
git add .
git commit -m "Initial commit: TSI registration system with MySQL"
```

### 2. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `tsi-registration` (or your choice)
3. Make it Private or Public
4. Don't initialize with README (you already have files)
5. Click "Create repository"

### 3. Push to GitHub

```cmd
git remote add origin https://github.com/YOUR-USERNAME/tsi-registration.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## Deploy to Vercel (Recommended)

### 1. Prepare for Deployment

Make sure `.env.local` is in `.gitignore` (already done).

### 2. Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your `tsi-registration` repository
5. Configure:
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `pnpm build`
   - Install Command: `pnpm install`

### 3. Add Environment Variables in Vercel

In Vercel project settings > Environment Variables, add:

```
DATABASE_URL=mysql://username:password@host:3306/tsi
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@reseau-tsi.com
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

**Important:** You'll need a cloud MySQL database for production:
- **PlanetScale** (Free tier): https://planetscale.com
- **Railway** (Free tier): https://railway.app
- **AWS RDS** (Paid)

### 4. Deploy

Click "Deploy" and wait for build to complete.

## Alternative: Deploy with Cloud Database

### Option A: PlanetScale (Free MySQL)

1. Sign up at https://planetscale.com
2. Create new database: `tsi`
3. Get connection string
4. Update `DATABASE_URL` in Vercel environment variables
5. Run migrations:
   ```cmd
   pnpm prisma db push
   ```

### Option B: Railway (Free MySQL)

1. Sign up at https://railway.app
2. New Project > Add MySQL
3. Copy connection string
4. Update `DATABASE_URL` in Vercel environment variables
5. Run migrations

## Local Testing Before Deploy

Test production build locally:

```cmd
pnpm build
pnpm start
```

Visit http://localhost:3000 and test all features.

## Post-Deployment Checklist

- [ ] Test registration (Company)
- [ ] Test registration (Contributor)
- [ ] Test login
- [ ] Verify welcome email is sent
- [ ] Check database entries in phpMyAdmin/cloud dashboard
- [ ] Test forgot password page
- [ ] Test all navigation links

## Troubleshooting

### Build fails on Vercel:
- Check build logs for errors
- Make sure all dependencies are in `package.json`
- Verify environment variables are set

### Database connection fails:
- Check `DATABASE_URL` format
- Ensure database is accessible from Vercel (cloud database required)
- XAMPP localhost won't work on Vercel (use cloud database)

### Emails not sending:
- Verify email credentials in environment variables
- Check email provider allows SMTP from Vercel IPs
- Consider using SendGrid or Resend for production emails

## Update Deployment

After making changes:

```cmd
git add .
git commit -m "Your commit message"
git push
```

Vercel will automatically redeploy.
