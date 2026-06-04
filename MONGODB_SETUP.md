# MongoDB Setup Instructions for CodeVerse

## ✅ What's Already Done
- All "Site Era" references have been changed to "CodeVerse" throughout the website
- Package name updated to `codeverse`
- All metadata, emails, and branding updated

## 🔧 MongoDB Atlas Configuration

### Your Existing Cluster
- **Cluster Name**: `site era` (keep this as-is, it's just an internal identifier)
- **No need to change**: The cluster name won't affect your application

### Database User Setup

1. **Go to MongoDB Atlas Dashboard**
   - Navigate to: Database Access (in the left sidebar)

2. **Create a New Database User** (NOT your Atlas account login)
   - Click "Add New Database User"
   - Choose "Password" authentication method
   
   **Recommended Credentials:**
   - Username: `codeverse_admin` or `codeverse_user`
   - Password: Generate a strong password (avoid special characters like @, :, /, ?)
   
   **Database User Privileges:**
   - Built-in Role: `Read and write to any database`
   - Or: `Atlas admin` (for full access)

3. **Network Access Setup**
   - Go to: Network Access (in the left sidebar)
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your specific IP addresses

### Connection String Format

Your connection string should look like this:

```
mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/codeverse?retryWrites=true&w=majority
```

**Replace:**
- `USERNAME` → your database user (e.g., `codeverse_admin`)
- `PASSWORD` → your database user password
- `cluster` → your actual cluster address (check MongoDB Atlas for exact address)
- `codeverse` → database name (already set)

### Example .env.local File

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://codeverse_admin:YourStrongPassword123@cluster0.xxxxx.mongodb.net/codeverse?retryWrites=true&w=majority

# JWT Secret for authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-to-random-string

# Site URL (for production)
NEXT_PUBLIC_SITE_URL=https://codeverse.com
```

## 🔐 Security Best Practices

1. **Password Requirements:**
   - At least 12 characters
   - Mix of uppercase, lowercase, and numbers
   - Avoid: @ : / ? # [ ] @ in passwords (they can cause connection issues)

2. **Keep Secrets Safe:**
   - Never commit `.env.local` to Git
   - `.env.example` is for reference only
   - Use different credentials for development and production

3. **JWT Secret:**
   - Generate a random string (at least 32 characters)
   - You can use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

## 🚀 Testing Your Connection

1. Update your `.env.local` with real credentials
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Try accessing the admin panel or any feature that uses the database
4. Check terminal for connection errors

## 📧 Email Configuration

All email references have been updated to:
- **Contact Email**: `hello@codeverse.com`
- Make sure to update this to your actual email address in:
  - Footer component
  - Contact page
  - Any email service integrations

## ✨ Branding Summary

- **Old Name**: Site Era, SiteEra, siteera
- **New Name**: CodeVerse, Codeverse, codeverse
- **Logo**: "C" in a rounded square (primary color)
- **Domain**: codeverse.com (update when ready)

## 🎯 Next Steps

1. ✅ Create MongoDB database user
2. ✅ Configure network access
3. ✅ Update `.env.local` with connection string
4. ✅ Test the connection
5. ⬜ Update actual email addresses (hello@codeverse.com)
6. ⬜ Configure domain when ready
7. ⬜ Update social media links in Footer

---

**Note**: Your MongoDB cluster name "site era" is perfectly fine to keep. It's just an internal identifier and won't be visible to users or affect functionality.
