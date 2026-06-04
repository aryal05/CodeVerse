-- =====================================================
-- CODEVERSE SEED DATA FOR SUPABASE
-- Replace the sample data with your actual MongoDB data
-- =====================================================

-- =====================================================
-- 1. SEED PROJECTS
-- =====================================================
-- Replace these with your actual projects from MongoDB
INSERT INTO projects (title, slug, description, category, image, gallery, technologies, client, featured, status) VALUES
(
    'E-Commerce Platform',
    'ecommerce-platform',
    'A full-featured e-commerce platform with payment integration and admin dashboard',
    'Web App',
    'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
    ARRAY[
        'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'
    ],
    ARRAY['Next.js', 'React', 'Stripe', 'PostgreSQL'],
    'Tech Corp',
    true,
    'completed'
),
(
    'Mobile Banking App',
    'mobile-banking-app',
    'Secure mobile banking application with real-time transactions',
    'Mobile App',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
    ARRAY[
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800'
    ],
    ARRAY['React Native', 'Node.js', 'MongoDB'],
    'Bank Ltd',
    true,
    'completed'
),
(
    'Portfolio Website',
    'portfolio-website',
    'Modern portfolio website with animations and blog',
    'Landing Page',
    'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
    ARRAY[]::text[],
    ARRAY['Next.js', 'Tailwind CSS', 'Framer Motion'],
    null,
    false,
    'completed'
);

-- =====================================================
-- 2. SEED SERVICES
-- =====================================================
INSERT INTO services (title, slug, short_description, description, icon, image, features, technologies, active, featured, "order") VALUES
(
    'Web Development',
    'web-development',
    'Custom web applications built with modern technologies',
    'We build scalable, performant web applications using the latest frameworks and best practices. From simple websites to complex web platforms.',
    'code',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    '[
        {"title": "Custom Web Applications", "description": "Tailored solutions for your business", "icon": "code"},
        {"title": "Responsive Design", "description": "Works on all devices", "icon": "smartphone"},
        {"title": "SEO Optimized", "description": "Built for search engines", "icon": "search"},
        {"title": "Fast Performance", "description": "Lightning-fast load times", "icon": "zap"}
    ]'::jsonb,
    ARRAY['React', 'Next.js', 'Vue.js', 'Node.js', 'PostgreSQL'],
    true,
    true,
    1
),
(
    'Mobile Development',
    'mobile-development',
    'Native and cross-platform mobile applications',
    'Build engaging mobile experiences for iOS and Android using React Native and Flutter.',
    'smartphone',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    '[
        {"title": "iOS & Android", "description": "Single codebase, multiple platforms", "icon": "smartphone"},
        {"title": "Native Performance", "description": "Smooth and fast", "icon": "zap"},
        {"title": "Push Notifications", "description": "Engage your users", "icon": "bell"}
    ]'::jsonb,
    ARRAY['React Native', 'Flutter', 'Swift', 'Kotlin'],
    true,
    true,
    2
),
(
    'UI/UX Design',
    'ui-ux-design',
    'Beautiful and intuitive user interfaces',
    'Design-first approach to create stunning user experiences that convert.',
    'palette',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    '[
        {"title": "User Research", "description": "Understand your users", "icon": "users"},
        {"title": "Wireframing", "description": "Plan before building", "icon": "layout"},
        {"title": "Prototyping", "description": "Interactive mockups", "icon": "mouse-pointer"}
    ]'::jsonb,
    ARRAY['Figma', 'Adobe XD', 'Sketch'],
    true,
    false,
    3
);

-- =====================================================
-- 3. SEED BLOG POSTS
-- =====================================================
INSERT INTO blog (title, slug, excerpt, content, image, category, tags, published, featured, author) VALUES
(
    'Getting Started with Next.js 14',
    'getting-started-nextjs-14',
    'Learn the fundamentals of Next.js 14 and its new features',
    'Next.js 14 introduces several exciting features including improved performance, better developer experience, and new APIs. In this guide, we''ll explore the key features and how to get started with your first Next.js application...',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    'Development',
    ARRAY['Next.js', 'React', 'Tutorial'],
    true,
    true,
    '{"name": "Admin", "avatar": "", "bio": "Full-stack developer"}'::jsonb
),
(
    'UI/UX Design Trends 2024',
    'ui-ux-design-trends-2024',
    'Discover the latest trends in UI/UX design for 2024',
    'The world of UI/UX design is constantly evolving. Here are the top trends to watch in 2024...',
    'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=800',
    'Design',
    ARRAY['UI/UX', 'Design', 'Trends'],
    true,
    false,
    '{"name": "Admin", "avatar": "", "bio": "Full-stack developer"}'::jsonb
);

-- =====================================================
-- 4. SEED TESTIMONIALS
-- =====================================================
INSERT INTO testimonials (name, role, company, avatar, rating, content, featured, active) VALUES
(
    'John Smith',
    'CEO',
    'Tech Innovations Inc',
    'https://ui-avatars.com/api/?name=John+Smith&background=6366f1&color=fff&size=200',
    5,
    'Codeverse delivered an exceptional website that exceeded our expectations. Their attention to detail and technical expertise is outstanding.',
    true,
    true
),
(
    'Sarah Johnson',
    'Marketing Director',
    'Digital Solutions Ltd',
    'https://ui-avatars.com/api/?name=Sarah+Johnson&background=6366f1&color=fff&size=200',
    5,
    'Working with Codeverse was a pleasure. They understood our needs and delivered a product that truly represents our brand.',
    true,
    true
),
(
    'Michael Brown',
    'Founder',
    'Startup Hub',
    'https://ui-avatars.com/api/?name=Michael+Brown&background=6366f1&color=fff&size=200',
    5,
    'The team at Codeverse is incredibly talented. They built our MVP in record time without compromising on quality.',
    false,
    true
);

-- =====================================================
-- 5. SEED TEAM MEMBERS
-- =====================================================
INSERT INTO team_members (name, role, bio, avatar, email, social, skills, active) VALUES
(
    'Alex Carter',
    'Lead Developer',
    'Full-stack developer with 10+ years of experience in building scalable web applications.',
    'https://ui-avatars.com/api/?name=Alex+Carter&background=6366f1&color=fff&size=200',
    'alex@codeverse.com',
    '{"linkedin": "https://linkedin.com", "github": "https://github.com", "twitter": "https://twitter.com"}'::jsonb,
    ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS'],
    true
),
(
    'Emma Wilson',
    'UI/UX Designer',
    'Creative designer passionate about creating beautiful and intuitive user experiences.',
    'https://ui-avatars.com/api/?name=Emma+Wilson&background=ec4899&color=fff&size=200',
    'emma@codeverse.com',
    '{"linkedin": "https://linkedin.com", "dribbble": "https://dribbble.com"}'::jsonb,
    ARRAY['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
    true
),
(
    'David Lee',
    'Mobile Developer',
    'Specialist in React Native and Flutter, creating amazing mobile experiences.',
    'https://ui-avatars.com/api/?name=David+Lee&background=10b981&color=fff&size=200',
    'david@codeverse.com',
    '{"linkedin": "https://linkedin.com", "github": "https://github.com"}'::jsonb,
    ARRAY['React Native', 'Flutter', 'iOS', 'Android'],
    true
);

-- =====================================================
-- 6. SAMPLE MESSAGES (Optional - usually empty initially)
-- =====================================================
-- You typically don't seed messages, but here's an example
INSERT INTO messages (name, email, phone, company, service, budget, message, read) VALUES
(
    'Jane Doe',
    'jane@example.com',
    '+1234567890',
    'Example Corp',
    'Web Development',
    '$10k - $25k',
    'We are looking for a team to build our new company website. Please get in touch.',
    false
);

-- =====================================================
-- 7. VERIFY SEEDED DATA
-- =====================================================
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
SELECT 'settings', COUNT(*) FROM settings;

-- =====================================================
-- DONE! 🎉
-- Your database is now seeded with sample data
-- =====================================================
