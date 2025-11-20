# Git Commands - Ready to Copy & Paste

## Initial Setup (First Time Only)

### 1. Initialize Git
```cmd
git init
```

### 2. Add All Files
```cmd
git add .
```

### 3. First Commit
```cmd
git commit -m "Initial commit: TSI registration system with MySQL and email notifications"
```

### 4. Create GitHub Repository
Go to: https://github.com/new
- Repository name: `tsi-registration` (or your choice)
- Description: "Registration system for Réseau TSI with MySQL and Nodemailer"
- Private or Public (your choice)
- Don't initialize with README
- Click "Create repository"

### 5. Connect to GitHub
**Replace YOUR-USERNAME with your actual GitHub username:**

```cmd
git remote add origin https://github.com/YOUR-USERNAME/tsi-registration.git
```

### 6. Push to GitHub
```cmd
git branch -M main
git push -u origin main
```

## Daily Workflow

### After Making Changes

```cmd
git add .
git commit -m "Description of your changes"
git push
```

## Common Commit Messages

```cmd
# After fixing bugs
git commit -m "Fix: Resolved login authentication issue"

# After adding features
git commit -m "Feature: Added password reset functionality"

# After updating styles
git commit -m "Style: Updated login page design"

# After updating documentation
git commit -m "Docs: Updated setup instructions"

# After refactoring code
git commit -m "Refactor: Improved email service code"
```

## Check Status

```cmd
git status
```

## View Commit History

```cmd
git log --oneline
```

## Create New Branch

```cmd
git checkout -b feature-name
```

## Switch Branch

```cmd
git checkout main
```

## Undo Last Commit (Keep Changes)

```cmd
git reset --soft HEAD~1
```

## Discard All Local Changes

```cmd
git reset --hard HEAD
```

## Pull Latest Changes

```cmd
git pull origin main
```

## Clone Repository (On Another Computer)

```cmd
git clone https://github.com/YOUR-USERNAME/tsi-registration.git
cd tsi-registration
pnpm install
```

## Troubleshooting

### If you get "fatal: not a git repository"
```cmd
git init
```

### If push is rejected
```cmd
git pull origin main --rebase
git push origin main
```

### If you need to change remote URL
```cmd
git remote set-url origin https://github.com/YOUR-USERNAME/tsi-registration.git
```

### View current remote
```cmd
git remote -v
```

## .gitignore Already Configured

These files/folders are automatically ignored:
- `node_modules/`
- `.env.local`
- `.next/`
- `prisma/*.db`
- Build files

## Ready to Push Checklist

- [ ] All files saved
- [ ] `.env.local` is in `.gitignore` (already done)
- [ ] No sensitive data in code
- [ ] Code tested locally
- [ ] Documentation updated
- [ ] Commit message is clear

## Example: Complete First Push

```cmd
# 1. Initialize
git init

# 2. Add files
git add .

# 3. Commit
git commit -m "Initial commit: TSI registration system"

# 4. Add remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/tsi-registration.git

# 5. Push
git branch -M main
git push -u origin main
```

## After First Push, Use This:

```cmd
git add .
git commit -m "Your changes description"
git push
```

That's it! 🚀
