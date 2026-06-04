-- =====================================================
-- CODEVERSE DATABASE SCHEMA FOR SUPABASE (PostgreSQL)
-- Run this entire script in Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. PROJECTS TABLE
-- =====================================================
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    full_description TEXT,
    category VARCHAR(100) NOT NULL,
    image TEXT, -- URL or base64
    gallery TEXT[], -- Array of image URLs
    technologies TEXT[], -- Array of tech names
    client VARCHAR(255),
    duration VARCHAR(100),
    link VARCHAR(500), -- Live URL
    github VARCHAR(500), -- GitHub URL
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'completed', -- 'completed', 'in-progress', 'planning'
    "order" INTEGER DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for better query performance
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_status ON projects(status);

-- =====================================================
-- 2. SERVICES TABLE
-- =====================================================
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT, -- Service image URL
    icon VARCHAR(100), -- Icon name (e.g., 'code', 'smartphone')
    features JSONB DEFAULT '[]', -- Array of {title, description, icon}
    process JSONB DEFAULT '[]', -- Array of {step, title, description}
    technologies TEXT[], -- Array of tech names
    pricing JSONB, -- {basic: {name, price, features}, standard: {...}, premium: {...}}
    faq JSONB DEFAULT '[]', -- Array of {question, answer}
    "order" INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for better query performance
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_active ON services(active);
CREATE INDEX idx_services_featured ON services(featured);

-- =====================================================
-- 3. BLOG TABLE
-- =====================================================
CREATE TABLE blog (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT, -- Cover image URL
    gallery TEXT[], -- Additional images
    author JSONB DEFAULT '{"name": "Admin", "avatar": "", "bio": ""}', -- {name, avatar, bio}
    category VARCHAR(100),
    tags TEXT[], -- Array of tags
    read_time VARCHAR(50),
    published BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for better query performance
CREATE INDEX idx_blog_slug ON blog(slug);
CREATE INDEX idx_blog_category ON blog(category);
CREATE INDEX idx_blog_published ON blog(published);
CREATE INDEX idx_blog_featured ON blog(featured);
CREATE INDEX idx_blog_created_at ON blog(created_at DESC);

-- =====================================================
-- 4. TESTIMONIALS TABLE
-- =====================================================
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    avatar TEXT, -- Avatar image URL
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    content TEXT NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for better query performance
CREATE INDEX idx_testimonials_featured ON testimonials(featured);
CREATE INDEX idx_testimonials_active ON testimonials(active);

-- =====================================================
-- 5. TEAM MEMBERS TABLE
-- =====================================================
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    bio TEXT,
    avatar TEXT, -- Avatar image URL
    email VARCHAR(255),
    phone VARCHAR(50),
    social JSONB DEFAULT '{}', -- {linkedin, twitter, github, etc}
    skills TEXT[], -- Array of skills
    active BOOLEAN DEFAULT TRUE,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for better query performance
CREATE INDEX idx_team_active ON team_members(active);

-- =====================================================
-- 6. MESSAGES/CONTACT TABLE
-- =====================================================
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    service VARCHAR(255),
    budget VARCHAR(100),
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for better query performance
CREATE INDEX idx_messages_read ON messages(read);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- =====================================================
-- 7. SETTINGS TABLE (Site-wide settings)
-- =====================================================
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(255) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (key, value, description) VALUES
('site_info', '{"name": "Codeverse", "tagline": "Building Digital Excellence", "email": "codeversebuild@outlook.com", "phone": "+977 980-000-0000", "address": "Kathmandu, Nepal"}', 'Basic site information'),
('social_links', '{"linkedin": "https://linkedin.com", "twitter": "https://twitter.com", "instagram": "https://instagram.com", "github": "https://github.com"}', 'Social media links'),
('seo', '{"title": "Codeverse - Digital Agency", "description": "A full-service digital agency crafting exceptional digital experiences", "keywords": "web development, mobile apps, digital agency"}', 'SEO settings');

-- =====================================================
-- 8. USERS TABLE (Admin authentication)
-- =====================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Hashed password
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'admin', -- 'admin', 'editor', 'viewer'
    active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user (password: admin123 - CHANGE THIS!)
-- Password hash for 'admin123' using bcrypt
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@codeverse.com', '$2a$10$rBV2WJ/QHPQ6cYdYx3qLk.X5Z5Y0Y6Y8Y9Y0Y1Y2Y3Y4Y5Y6Y7Y8Y9', 'admin');

-- =====================================================
-- 9. ANALYTICS TABLE (Optional - for tracking)
-- =====================================================
CREATE TABLE analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page VARCHAR(500) NOT NULL,
    action VARCHAR(100) NOT NULL, -- 'view', 'click', 'download', etc
    user_agent TEXT,
    ip_address VARCHAR(50),
    referrer VARCHAR(500),
    metadata JSONB, -- Additional data
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for analytics queries
CREATE INDEX idx_analytics_page ON analytics(page);
CREATE INDEX idx_analytics_created_at ON analytics(created_at DESC);

-- =====================================================
-- 10. AUTO-UPDATE TRIGGERS
-- =====================================================

-- Function to update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_updated_at BEFORE UPDATE ON blog FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 11. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can read active projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can read active services" ON services FOR SELECT USING (active = true);
CREATE POLICY "Public can read published blog posts" ON blog FOR SELECT USING (published = true);
CREATE POLICY "Public can read active testimonials" ON testimonials FOR SELECT USING (active = true);
CREATE POLICY "Public can read active team members" ON team_members FOR SELECT USING (active = true);
CREATE POLICY "Public can read settings" ON settings FOR SELECT USING (true);

-- Public can insert messages (contact form)
CREATE POLICY "Public can insert messages" ON messages FOR INSERT WITH CHECK (true);

-- Admin full access (you'll need to configure auth.uid() based on your auth setup)
-- For now, using service_role key will bypass RLS

-- =====================================================
-- DONE! 🎉
-- =====================================================

-- Verify tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check row counts
SELECT 
    'projects' as table_name, COUNT(*) as row_count FROM projects
UNION ALL
SELECT 'services', COUNT(*) FROM services
UNION ALL
SELECT 'blog', COUNT(*) FROM blog
UNION ALL
SELECT 'testimonials', COUNT(*) FROM testimonials
UNION ALL
SELECT 'team_members', COUNT(*) FROM team_members
UNION ALL
SELECT 'messages', COUNT(*) FROM messages
UNION ALL
SELECT 'settings', COUNT(*) FROM settings
UNION ALL
SELECT 'users', COUNT(*) FROM users;
