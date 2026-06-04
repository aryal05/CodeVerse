# 🔧 How to Import Environment Variables to Vercel

## Option 1: Import via File (Recommended)

### Step 1: Copy the Environment File
The file `vercel-env-import.txt` contains all your environment variables.

### Step 2: Import to Vercel
1. Go to https://vercel.com
2. Select your project: **Site-Era** or **codeverse-eosin**
3. Go to **Settings** → **Environment Variables**
4. Click **"Import .env"** button (top right)
5. Copy the entire content from `vercel-env-import.txt`
6. Paste it into the import box
7. Select **"Production"**, **"Preview"**, and **"Development"** (all three)
8. Click **"Import"**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click "..." menu on the latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

---

## Option 2: Add Manually (Alternative)

If import doesn't work, add each variable manually:

### Go to Settings → Environment Variables → Add New

**Variable 1:**
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://ymwavisoanxlayuqhehn.supabase.co
```

**Variable 2:**
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltd2F2aXNvYW54bGF5dXFoZWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1Njk0MTcsImV4cCI6MjA5NjE0NTQxN30.BuHFPdYcTGxDWOtScyvGqBrroHksCDAQ3pwb-iIAs_A
```

**Variable 3:**
```
Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltd2F2aXNvYW54bGF5dXFoZWhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDU2OTQxNywiZXhwIjoyMDk2MTQ1NDE3fQ.Dil-UnIOagXMDH4tk_nSIDr1nm90_SGa1ASgEFdQECs
```

**Variable 4:**
```
Name: JWT_SECRET
Value: 0f832387b49dc3439b7d67d86a462fa52a69772d451eff731887b8afba77c6aa
```

**Variable 5:**
```
Name: NEXT_PUBLIC_SITE_URL
Value: https://codeverse-eosin.vercel.app
```

---

## ✅ Verify Environment Variables

After importing/adding and redeploying, visit:
```
https://codeverse-eosin.vercel.app/api/health
```

You should see:
```json
{
  "status": "healthy",
  "environmentVariables": {
    "NEXT_PUBLIC_SUPABASE_URL": true,
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": true,
    "SUPABASE_SERVICE_ROLE_KEY": true,
    "JWT_SECRET": true,
    "NEXT_PUBLIC_SITE_URL": true
  }
}
```

All values should be `true`!

---

## 🎯 What's Fixed

✅ **Title**: Changed from "SiteEra" to "CodeVerse"  
✅ **Default Theme**: Light mode (was dark)  
✅ **Site URL**: Updated to https://codeverse-eosin.vercel.app  
✅ **Environment Variables**: Ready to import

---

## 📝 After Environment Variables Are Set

1. **Test Homepage**: https://codeverse-eosin.vercel.app
2. **Test Admin**: https://codeverse-eosin.vercel.app/admin
3. **Add Content**: Login and add services, projects, etc.
4. **Verify**: Data should show on homepage

---

**Your site will work perfectly after importing these environment variables!** 🚀
