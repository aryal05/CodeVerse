# Site Era - Next.js Full Stack Application

Premium Web & Mobile App Development Company website built with **Next.js 14**, **MongoDB**, and **Tailwind CSS**.

## 🚀 Features

- **Full Stack**: Frontend + Backend API in one project
- **MongoDB Atlas**: Cloud database for all content
- **Admin Dashboard**: Manage projects, services, blog, team, etc.
- **SEO Optimized**: Server-side rendering with metadata
- **Modern UI**: Framer Motion animations, Tailwind CSS

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB Atlas
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Auth**: JWT

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create `.env.local`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/siteera?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Seed Database

After setting up MongoDB, seed the database:

```bash
curl -X POST http://localhost:3000/api/seed
```

## 🌐 Deploy to Vercel

### One-Click Deploy

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
5. Deploy!

### Custom Domain

After deployment:
1. Go to Project Settings → Domains
2. Add `siteera.com`
3. Configure DNS as instructed

## 📁 Project Structure

```
nextjs/
├── src/
│   ├── app/
│   │   ├── api/           # API Routes (Backend)
│   │   │   ├── projects/
│   │   │   ├── services/
│   │   │   ├── blog/
│   │   │   ├── team/
│   │   │   ├── testimonials/
│   │   │   ├── messages/
│   │   │   ├── settings/
│   │   │   ├── auth/
│   │   │   └── seed/
│   │   ├── admin/         # Admin Dashboard
│   │   ├── about/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── layout.jsx
│   │   ├── page.jsx       # Home Page
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   ├── pages/
│   │   └── ui/
│   ├── lib/
│   │   ├── db.js          # MongoDB Connection
│   │   └── api.js         # API Client
│   └── models/            # MongoDB Models
├── package.json
├── next.config.js
├── tailwind.config.js
└── vercel.json
```

## 🔐 Admin Access

- URL: `/admin`
- Default credentials: `admin` / `admin123`

## 📊 API Endpoints

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/projects` | GET, POST | Projects/Portfolio |
| `/api/projects/[id]` | GET, PUT, DELETE | Single project |
| `/api/services` | GET, POST | Services |
| `/api/services/[slug]` | GET, PUT, DELETE | Single service |
| `/api/blog` | GET, POST | Blog posts |
| `/api/blog/[slug]` | GET, PUT, DELETE | Single post |
| `/api/team` | GET, POST | Team members |
| `/api/testimonials` | GET, POST | Testimonials |
| `/api/messages` | GET, POST | Contact messages |
| `/api/settings` | GET, PUT | Site settings |
| `/api/auth/login` | POST | Admin login |
| `/api/newsletter` | POST | Newsletter subscribe |
| `/api/seed` | POST | Seed database |

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change the color scheme.

### Content

Use the admin dashboard at `/admin` to manage all content.

## 📝 License

MIT License - Rajat Aryal / Site Era

---

**Built with ❤️ in Nepal**
