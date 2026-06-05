import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export function getDb() {
  const db = getSupabaseAdmin();

  if (!db) {
    throw new ApiError('Database not configured. Check Supabase environment variables in Vercel.', 500);
  }

  return db;
}

export class ApiError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function handleApiError(error, fallback = 'Request failed') {
  const status = error?.status || 500;
  const message = error?.message || fallback;

  console.error(fallback, error);

  return NextResponse.json(
    {
      error: message,
      ...(error?.details ? { details: error.details } : {})
    },
    { status }
  );
}

export function notFound(resource = 'Resource') {
  return NextResponse.json({ error: `${resource} not found` }, { status: 404 });
}

export function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ''));
}

export function byIdOrSlug(query, value, slugColumn = 'slug') {
  return isUuid(value) ? query.eq('id', value) : query.eq(slugColumn, value);
}

export function slugify(value = '') {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function compact(object) {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined)
  );
}

export function arrayValue(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string') {
    return value
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);
  }
  return [];
}

export function mapProject(row) {
  if (!row) return null;
  return {
    ...row,
    _id: row.id,
    fullDescription: row.full_description,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function projectPayload(input = {}, { insert = false } = {}) {
  const title = input.title?.trim();

  return compact({
    title,
    slug: input.slug || (insert && title ? slugify(title) : undefined),
    description: input.description ?? (insert ? 'No description provided' : undefined),
    full_description: input.fullDescription ?? input.full_description,
    category: input.category ?? (insert ? 'Other' : undefined),
    image: input.image,
    gallery: Array.isArray(input.gallery) ? input.gallery : undefined,
    technologies: Array.isArray(input.technologies) ? input.technologies : arrayValue(input.technologies),
    client: input.client,
    duration: input.duration,
    link: input.link ?? input.liveUrl,
    github: input.github ?? input.githubUrl,
    featured: input.featured,
    status: input.status ?? (insert ? 'completed' : undefined),
    order: input.order,
    meta_title: input.metaTitle ?? input.meta_title,
    meta_description: input.metaDescription ?? input.meta_description
  });
}

export function mapService(row) {
  if (!row) return null;
  return {
    ...row,
    _id: row.id,
    name: row.title,
    shortDescription: row.short_description,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function servicePayload(input = {}, { insert = false } = {}) {
  const title = (input.title ?? input.name)?.trim();
  const description = input.description ?? input.shortDescription ?? input.short_description;

  return compact({
    title,
    slug: input.slug || (insert && title ? slugify(title) : undefined),
    short_description: input.shortDescription ?? input.short_description ?? description ?? (insert ? 'No description provided' : undefined),
    description: description ?? (insert ? 'No description provided' : undefined),
    image: input.image,
    icon: input.icon,
    features: Array.isArray(input.features) ? input.features : undefined,
    process: Array.isArray(input.process) ? input.process : undefined,
    technologies: Array.isArray(input.technologies) ? input.technologies : arrayValue(input.technologies),
    pricing: input.pricing,
    faq: Array.isArray(input.faq) ? input.faq : undefined,
    order: input.order,
    featured: input.featured ?? (insert ? false : undefined),
    active: input.active ?? (insert ? true : undefined),
    meta_title: input.metaTitle ?? input.meta_title,
    meta_description: input.metaDescription ?? input.meta_description
  });
}

export function mapBlog(row) {
  if (!row) return null;
  return {
    ...row,
    _id: row.id,
    readTime: row.read_time,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function blogPayload(input = {}, { insert = false } = {}) {
  const title = input.title?.trim();
  const content = input.content ?? '';

  return compact({
    title,
    slug: input.slug || (insert && title ? slugify(title) : undefined),
    excerpt: input.excerpt ?? (insert ? content.slice(0, 160) || title || 'No excerpt provided' : undefined),
    content: input.content ?? (insert ? '' : undefined),
    image: input.image,
    gallery: Array.isArray(input.gallery) ? input.gallery : undefined,
    author: input.author ?? (insert ? { name: 'Admin', avatar: '', bio: '' } : undefined),
    category: input.category,
    tags: Array.isArray(input.tags) ? input.tags : arrayValue(input.tags),
    read_time: input.readTime ?? input.read_time ?? (insert ? '5 min read' : undefined),
    published: input.published ?? (insert ? false : undefined),
    featured: input.featured ?? (insert ? false : undefined),
    views: input.views,
    likes: input.likes,
    meta_title: input.metaTitle ?? input.meta_title,
    meta_description: input.metaDescription ?? input.meta_description
  });
}

export function mapTestimonial(row) {
  if (!row) return null;
  return {
    ...row,
    _id: row.id,
    image: row.avatar,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function testimonialPayload(input = {}, { insert = false } = {}) {
  return compact({
    name: input.name,
    role: input.role ?? (insert ? 'Client' : undefined),
    company: input.company,
    avatar: input.avatar ?? input.image,
    rating: input.rating ?? (insert ? 5 : undefined),
    content: input.content,
    featured: input.featured ?? (insert ? false : undefined),
    active: input.active ?? (insert ? true : undefined),
    order: input.order
  });
}

export function mapTeamMember(row) {
  if (!row) return null;
  return {
    ...row,
    _id: row.id,
    image: row.avatar,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function teamPayload(input = {}, { insert = false } = {}) {
  return compact({
    name: input.name,
    role: input.role ?? (insert ? 'Team Member' : undefined),
    bio: input.bio,
    avatar: input.avatar ?? input.image,
    email: input.email,
    phone: input.phone,
    social: input.social,
    skills: Array.isArray(input.skills) ? input.skills : arrayValue(input.skills),
    active: input.active ?? (insert ? true : undefined),
    order: input.order
  });
}

export function mapMessage(row) {
  if (!row) return null;
  return {
    ...row,
    _id: row.id,
    subject: row.subject,
    createdAt: row.created_at
  };
}

export function messagePayload(input = {}, { insert = false } = {}) {
  return compact({
    name: input.name,
    email: input.email,
    phone: input.phone,
    company: input.company,
    service: input.service,
    budget: input.budget,
    message: input.message ?? input.subject ?? (insert ? '' : undefined),
    read: input.read ?? (insert ? false : undefined),
    archived: input.archived ?? (insert ? false : undefined)
  });
}
