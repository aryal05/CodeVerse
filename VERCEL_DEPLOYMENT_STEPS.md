# 🚀 Quick Vercel Deployment Steps

## ✅ Code Pushed to GitHub
Repository: https://github.com/aryal05/Site-Era

---

## 📋 Vercel Deployment Checklist

### Step 1: Go to Vercel
👉 https://vercel.com

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Select your GitHub account
3. Find repository: **"Site-Era"**
4. Click **"Import"**

### Step 3: Configure Project Settings
Leave defaults as they are:
- ✅ Framework: Next.js (auto-detected)
- ✅ Root Directory: `./`
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`

### Step 4: Add Environment Variables
**CRITICAL**: Click "Environment Variables" and add these ONE BY ONE:

| Variable Name | Value |
|--------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ymwavisoanxlayuqhehn.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltd2F2aXNvYW54bGF5dXFoZWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1Njk0MTcsImV4cCI6MjA5NjE0NTQxN30.BuHFPdYcTGxDWOtScyvGqBrroHksCDAQ3pwb-iIAs_A` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltd2F2aXNvYW54bGF5dXFoZWhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDU2OTQxNywiZXhwIjoyMDk2MTQ1NDE3fQ.Dil-UnIOagXMDH4tk_nSIDr1nm90_SGa1ASgEFdQECs` |
| `JWT_SECRET` | `0f832387b49dc3439b7d67d86a462fa52a69772d451eff731887b8afba77c6aa` |
| `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` (update after deployment) |

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes ⏳
3. You'll get a URL like: `https://site-era-xxx.vercel.app`

### Step 6: Update Site URL
1. Copy your Vercel deployment URL
2. Go to Vercel → Settings → Environment Variables
3. Edit `NEXT_PUBLIC_SITE_URL` with your actual URL
4. Click "Redeploy" from Deployments tab

---

## 🎯 After Deployment

### 1. Test Your Website
Visit: `https://your-deployment-url.vercel.app`

**Expected behavior:**
- ✅ Homepage loads
- ⚠️ Services section shows "No services" (empty database)
- ⚠️ Projects section shows "No projects" (empty database)

### 2. Add Content via Admin Panel
1. Visit: `https://your-deployment-url.vercel.app/admin`
2. Login: `admin` / `admin123`
3. Add services, projects, blog posts

### 3. Verify Data Shows Up
- Refresh homepage
- Services and projects should now display

---

## 🔧 Troubleshooting

### Build Fails?
**Check**: Package.json has all dependencies
```bash
npm install
git add package.json package-lock.json
git commit -m "fix: update dependencies"
git push
```

### 500 Error?
**Check**: Environment variables are set correctly in Vercel

### No Data Showing?
**Check**: 
1. Visit `/api/projects` - should return empty array `[]`
2. Add data via admin panel
3. Check Supabase dashboard - tables should have data

---

## 📞 Support Links

- **Vercel Deployment Docs**: https://vercel.com/docs/deployments/overview
- **Next.js on Vercel**: https://vercel.com/docs/frameworks/nextjs
- **Supabase + Vercel**: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs

---

## ✨ Your Deployment URL

Once deployed, your website will be at:
**https://site-era-[random].vercel.app**

You can:
- Add a custom domain in Vercel settings
- Enable Vercel Analytics
- Set up continuous deployment (auto-deploys on git push)

---

**🎉 Ready to deploy! Just follow the steps above.**
