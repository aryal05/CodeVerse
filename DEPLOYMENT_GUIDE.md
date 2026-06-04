# 🚀 CodeVerse Deployment Guide

## Prerequisites
- ✅ Supabase account and project setup
- ✅ GitHub account
- ✅ Vercel account (sign up at https://vercel.com)

---

## 📦 Step 1: Push to GitHub

### Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "feat: Complete Supabase migration and CodeVerse rebranding"
```

### Create GitHub Repository
1. Go to https://github.com/new
2. Name your repository (e.g., `codeverse-website`)
3. Keep it **Private** (recommended for client work)
4. Don't initialize with README (you already have code)
5. Click **Create repository**

### Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/codeverse-website.git
git branch -M main
git push -u origin main
```

---

## 🌐 Step 2: Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with GitHub
3. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository `codeverse-website`
   - Click "Import"

4. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

5. **Add Environment Variables**:
   Click "Environment Variables" and add these:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://ymwavisoanxlayuqhehn.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltd2F2aXNvYW54bGF5dXFoZWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1Njk0MTcsImV4cCI6MjA5NjE0NTQxN30.BuHFPdYcTGxDWOtScyvGqBrroHksCDAQ3pwb-iIAs_A
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltd2F2aXNvYW54bGF5dXFoZWhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDU2OTQxNywiZXhwIjoyMDk2MTQ1NDE3fQ.Dil-UnIOagXMDH4tk_nSIDr1nm90_SGa1ASgEFdQECs
   JWT_SECRET=0f832387b49dc3439b7d67d86a462fa52a69772d451eff731887b8afba77c6aa
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

   **Important**: Update `NEXT_PUBLIC_SITE_URL` after deployment with your actual Vercel URL

6. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - You'll get a URL like: `https://codeverse-website.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? codeverse-website
# - Directory? ./
# - Override settings? N

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add JWT_SECRET

# Deploy to production
vercel --prod
```

---

## 🔧 Step 3: Post-Deployment Configuration

### 1. Update Supabase Allowed URLs
Go to your Supabase dashboard:
1. Navigate to **Authentication** → **URL Configuration**
2. Add your Vercel URL to **Site URL**
3. Add to **Redirect URLs**:
   - `https://your-domain.vercel.app`
   - `https://your-domain.vercel.app/**`

### 2. Add Data to Your Database
Since your database is empty, you need to add content:

**Option A: Via Admin Panel**
1. Visit `https://your-domain.vercel.app/admin`
2. Login: `admin` / `admin123`
3. Add services, projects, blog posts, testimonials

**Option B: Run Seed Script**
If you created a seed script with actual data:
```bash
# Run from Supabase SQL Editor
# Copy and paste content from supabase-seed.sql
```

### 3. Test Your Website
- ✅ Homepage loads
- ✅ Services section displays (if you added services)
- ✅ Projects section displays (if you added projects)
- ✅ Admin panel works
- ✅ Contact form submits

### 4. Custom Domain (Optional)
1. Go to Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add your custom domain (e.g., `codeverse.com`)
3. Update DNS records as shown by Vercel
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

---

## 🔒 Security Checklist

- ✅ All environment variables added to Vercel
- ✅ `.env.local` is in `.gitignore` (not pushed to GitHub)
- ✅ Supabase Row Level Security (RLS) policies enabled
- ✅ Default admin password changed (after first login)
- ✅ Service role key only used server-side

---

## 🐛 Troubleshooting

### Build Fails
```
Error: Cannot find module '@supabase/supabase-js'
```
**Fix**: Make sure `package.json` has the dependency:
```bash
npm install @supabase/supabase-js
git add package.json package-lock.json
git commit -m "fix: add supabase dependency"
git push
```

### Empty Data on Website
- Check if you added data via admin panel
- Verify API routes return data: `https://your-domain.vercel.app/api/projects`
- Check Supabase tables have data

### API Errors
- Verify environment variables are set in Vercel
- Check Supabase credentials are correct
- Look at Vercel Function Logs for errors

### 500 Internal Server Error
- Check Vercel Function Logs
- Verify Supabase connection works
- Ensure all environment variables are set

---

## 📊 Monitoring

### Vercel Analytics
- Automatically enabled
- View in Vercel Dashboard → Analytics

### Supabase Dashboard
- Monitor database usage
- Check API requests
- View logs for errors

---

## 🔄 Making Updates

### Update Code
```bash
# Make changes to your code
git add .
git commit -m "feat: add new feature"
git push
```

Vercel will **automatically redeploy** when you push to the `main` branch!

### Update Environment Variables
1. Vercel Dashboard → Settings → Environment Variables
2. Edit or add variables
3. Redeploy: Deployments → Click "..." → Redeploy

---

## 🎉 Your Website is Live!

**Production URL**: `https://your-domain.vercel.app`

**Admin Panel**: `https://your-domain.vercel.app/admin`

**Next Steps**:
1. Add your content via admin panel
2. Set up custom domain
3. Configure email for contact form
4. Set up analytics (Google Analytics, etc.)
5. Test on mobile devices

---

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

**Congratulations! Your CodeVerse website is now deployed! 🚀**
