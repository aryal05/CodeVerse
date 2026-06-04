# 🔧 Troubleshooting Guide - CodeVerse

## ❌ Login Error: "Invalid credentials"

### Problem:
Getting "401 Unauthorized" or "Invalid credentials" when trying to login with `admin` / `admin123`

### Solution (3 Options):

---

## ✅ **Option 1: Run Seed Script** (Recommended - Creates Everything)

Visit this URL in your browser:
```
http://localhost:3000/api/seed
```

**This will:**
- Create admin user
- Add sample content (services, projects, blog posts)
- Set up initial data

**Note:** This will DELETE existing data and recreate everything!

---

## ✅ **Option 2: Create Admin Only** (If you just need login)

Visit this URL in your browser:
```
http://localhost:3000/api/create-admin
```

**This will:**
- Create admin user ONLY
- Won't delete existing data
- Safe to run multiple times

---

## ✅ **Option 3: Check Database Status**

Visit this URL to see what's wrong:
```
http://localhost:3000/api/check-db
```

**This will show:**
- If database is connected
- If admin user exists
- What to do next

---

## 🔍 Step-by-Step Fix

### Step 1: Check if Server is Running
```bash
cd site-era
npm run dev
```

Wait for: `Ready - started server on http://localhost:3000`

---

### Step 2: Check Database Connection

Open browser: **http://localhost:3000/api/check-db**

**If you see "No admin user found":**
- Go to Step 3

**If you see "Failed to connect":**
- Check your `.env.local` file
- Verify MongoDB connection string is correct
- Check MongoDB Atlas network access

---

### Step 3: Create Admin User

**Option A - Full Setup (Recommended for first time):**
```
http://localhost:3000/api/seed
```

**Option B - Admin Only:**
```
http://localhost:3000/api/create-admin
```

---

### Step 4: Try Login Again

Go to: **http://localhost:3000/admin**

Login:
- **Username**: `admin`
- **Password**: `admin123`

---

## 🐛 Common Issues

### 1. "Failed to load resource: net::ERR_CONNECTION_REFUSED"

**Problem:** Server not running

**Solution:**
```bash
cd site-era
npm run dev
```

---

### 2. "Please define the MONGODB_URI environment variable"

**Problem:** Missing environment variables

**Solution:**
Check your `.env.local` file has:
```env
MONGODB_URI=mongodb+srv://codeverse_admin:admin123@cluster0.vmmpnoj.mongodb.net/codeverse?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=0f832387b49dc3439b7d67d86a462fa52a69772d451eff731887b8afba77c6aa
```

---

### 3. "MongoNetworkError: connection refused"

**Problem:** MongoDB can't connect

**Solution:**
1. Check MongoDB Atlas is running
2. Go to Network Access in Atlas
3. Add your IP or use `0.0.0.0/0` (allow all) for development
4. Check database user exists

---

### 4. "Invalid credentials" (even after seeding)

**Possible causes:**
- Wrong username/password (check for spaces)
- Database user created but in wrong database
- Browser cached old data

**Solution:**
1. Clear browser cache and cookies
2. Try incognito/private window
3. Check browser console for actual error
4. Run seed script again:
   ```
   http://localhost:3000/api/seed
   ```

---

### 5. Port 3000 already in use

**Problem:** Another app using port 3000

**Solution:**
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Or use different port
PORT=3001 npm run dev
```

---

## 🧪 Test Everything

### Test 1: Server Running
```
✅ Visit: http://localhost:3000
Should show: Homepage
```

### Test 2: Database Connected
```
✅ Visit: http://localhost:3000/api/check-db
Should show: "success" status
```

### Test 3: Admin Exists
```
✅ Visit: http://localhost:3000/api/check-db
Should show: admin user details
```

### Test 4: Login Works
```
✅ Visit: http://localhost:3000/admin
✅ Login: admin / admin123
Should redirect to: dashboard
```

---

## 🆘 Still Not Working?

### Check Server Logs

Look at your terminal where `npm run dev` is running.

**Good signs:**
```
✓ Compiled in XXms
✓ Ready on http://localhost:3000
MongoDB connected successfully
```

**Bad signs:**
```
MongoError: ...
Error: MONGODB_URI not defined
Connection refused
```

---

### Check Browser Console

1. Press `F12` in browser
2. Go to "Console" tab
3. Look for red errors
4. Share the error message

---

### Manual Database Check

1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Click "Browse Collections"
3. Select `codeverse` database
4. Check if `users` collection exists
5. Should have 1 document with username "admin"

---

## 📞 Quick Reference

| URL | Purpose |
|-----|---------|
| `http://localhost:3000` | Homepage |
| `http://localhost:3000/admin` | Admin login |
| `http://localhost:3000/api/check-db` | Check database status |
| `http://localhost:3000/api/seed` | Create all initial data |
| `http://localhost:3000/api/create-admin` | Create admin user only |

---

## ✅ Expected Flow

```
1. Start server → npm run dev
2. Seed database → /api/seed
3. Check status → /api/check-db (should say success)
4. Login → /admin (admin/admin123)
5. Success! 🎉
```

---

**Still stuck? Check your MongoDB Atlas dashboard to ensure the cluster is active and accepting connections!**
