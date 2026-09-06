import { getOptionalDb } from '@/lib/api-helpers';
import { SITE_URL } from '@/lib/site';

const staticRoutes = ['', '/about', '/services', '/portfolio', '/pricing', '/contact'];

export default async function sitemap() {
  const now = new Date();
  const entries = staticRoutes.map((path, index) => ({
    url: `${SITE_URL}${path || '/'}`,
    lastModified: now,
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : path === '/services' ? 0.9 : 0.7,
  }));

  try {
    const db = getOptionalDb();
    if (!db) return entries;
    const [services, projects] = await Promise.all([
      db.from('services').select('slug,updated_at').eq('active', true),
      db.from('projects').select('id,slug,updated_at').eq('status', 'published'),
    ]);

    for (const item of services.data || []) {
      entries.push({
        url: `${SITE_URL}/services/${item.slug}`,
        lastModified: item.updated_at ? new Date(item.updated_at) : now,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
    for (const item of projects.data || []) {
      entries.push({
        url: `${SITE_URL}/portfolio/${item.slug || item.id}`,
        lastModified: item.updated_at ? new Date(item.updated_at) : now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  } catch {}

  return entries;
}
