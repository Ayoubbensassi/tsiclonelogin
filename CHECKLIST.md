# Pre-Deployment Checklist

## Local Setup ✓

- [ ] XAMPP installed and running (Apache + MySQL)
- [ ] Database `tsi` created in phpMyAdmin
- [ ] `.env.local` configured with correct credentials
- [ ] Dependencies installed (`pnpm install`)
- [ ] Prisma generated (`pnpm prisma generate`)
- [ ] Database tables created (`pnpm prisma db push`)
- [ ] Email credentials configured (Gmail App Password)

## Testing ✓

- [ ] Development server runs (`pnpm dev`)
- [ ] Home page redirects to `/choice-register`
- [ ] Can navigate to login page
- [ ] Can navigate to company registration
- [ ] Can navigate to contributor registration
- [ ] Company registration form submits successfully
- [ ] Contributor registration form submits successfully
- [ ] User data saved in database (check phpMyAdmin)
- [ ] Welcome email received after registration
- [ ] Login works with registered credentials
- [ ] Forgot password page loads
- [ ] All images/SVGs display correctly

## Code Quality ✓

- [ ] No console errors in browser
- [ ] No TypeScript errors
- [ ] All forms validate properly
- [ ] Password confirmation works
- [ ] Error messages display correctly
- [ ] Loading states work properly

## Security ✓

- [ ] Passwords are hashed (bcryptjs)
- [ ] `.env.local` is in `.gitignore`
- [ ] No sensitive data in code
- [ ] Email validation works
- [ ] SQL injection protected (Prisma ORM)

## Git & GitHub ✓

- [ ] Git initialized
- [ ] `.gitignore` configured properly
- [ ] All files committed
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Repository is private (if needed)

## Documentation ✓

- [ ] README.md complete
- [ ] SETUP.md with instructions
- [ ] DEPLOYMENT.md with deployment guide
- [ ] Environment variables documented

## Deployment Preparation ✓

- [ ] Production build works (`pnpm build`)
- [ ] Production server runs (`pnpm start`)
- [ ] Cloud database chosen (PlanetScale/Railway)
- [ ] Cloud database created
- [ ] Database connection string obtained
- [ ] Vercel account created
- [ ] Environment variables ready for Vercel

## Post-Deployment ✓

- [ ] Application deployed successfully
- [ ] Database migrations run on production
- [ ] Environment variables set in Vercel
- [ ] Production URL works
- [ ] Registration tested on production
- [ ] Login tested on production
- [ ] Emails sending on production
- [ ] Database entries visible in cloud dashboard

## Optional Enhancements

- [ ] Add session management (NextAuth.js)
- [ ] Add email verification
- [ ] Add password reset functionality
- [ ] Add user dashboard
- [ ] Add admin panel
- [ ] Add file upload for documents
- [ ] Add profile editing
- [ ] Add 2FA authentication
- [ ] Add rate limiting
- [ ] Add logging system

## Notes

**Current Status:** Ready for local testing with XAMPP

**Next Steps:**
1. Test locally with XAMPP
2. Fix any issues
3. Push to GitHub
4. Setup cloud database
5. Deploy to Vercel

**Important Reminders:**
- XAMPP database won't work on Vercel (localhost only)
- Use PlanetScale or Railway for production database
- Keep `.env.local` secret and never commit it
- Test email sending before going live
