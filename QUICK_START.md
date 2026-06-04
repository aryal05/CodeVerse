# 🚀 CodeVerse - Quick Start Guide

## ⚡ 3 Steps to Get Started

### Step 1: Start the Server
```bash
cd site-era
npm run dev
```

Wait for: `Ready - started server on http://localhost:3000`

---

### Step 2: Seed the Database
Open your browser and visit:
```
http://localhost:3000/api/seed
```

You should see:
```json
{
  "message": "Database seeded successfully!",
  "data": {
    "admin": { "username": "admin", "password": "admin123" },
    ...
  }
}
```

✅ **This creates:**
- Admin account
- Sample services
- Sample projects
- Sample blog posts
- Team members
- Testimonials

---

### Step 3: Login to Admin Panel
1. Go to: **http://localhost:3000/admin**
2. Login with:
   - **Username**: `admin`
   - **Password**: `admin123`

---

## 🎨 Now You Can:

### ✅ Manage Content
- **Blog Posts**: `/admin/dashboard/blog`
- **Projects**: `/admin/dashboard/projects`
- **Services**: `/admin/dashboard/services`
- **Team**: `/admin/dashboard/team`
- **Testimonials**: `/admin/dashboard/testimonials`
- **Messages**: `/admin/dashboard/messages`
- **Settings**: `/admin/dashboard/settings`

### ✅ View Public Website
- **Homepage**: `http://localhost:3000`
- **About**: `http://localhost:3000/about`
- **Services**: `http://localhost:3000/services`
- **Portfolio**: `http://localhost:3000/portfolio`
- **Blog**: `http://localhost:3000/blog`
- **Contact**: `http://localhost:3000/contact`

---

## 📊 View Your Data in MongoDB

### MongoDB Atlas (Web)
1. Go to: https://cloud.mongodb.com
2. Login
3. Click "Browse Collections"
4. Select `codeverse` database
5. See all your data!

---

## 🎯 What Changed?

### ✅ Complete Rebrand
- **Old**: Site Era
- **New**: CodeVerse
- All branding, emails, metadata updated

### ✅ MongoDB Connected
- Database: `codeverse`
- User: `codeverse_admin`
- Ready to store data

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `.env.local` | Your MongoDB connection & secrets |
| `HOW_DATA_WORKS.md` | Detailed data flow explanation |
| `MONGODB_SETUP.md` | MongoDB configuration guide |
| `package.json` | Project dependencies |

---

## 🔧 Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## ⚠️ Important Notes

1. **Never commit `.env.local`** - It contains secrets!
2. **Change admin password** after first login
3. **Seed only once** - Running again will delete all data
4. **Keep MongoDB password secure**

---

## 🆘 Need Help?

Check these files:
- `HOW_DATA_WORKS.md` - Understand data flow
- `MONGODB_SETUP.md` - MongoDB configuration
- `README.md` - Full project documentation

---

## 🎉 You're Ready!

1. ✅ Server running
2. ✅ Database seeded
3. ✅ Admin access working
4. ✅ Start building your content!

**Visit**: http://localhost:3000 to see your website! 🚀
