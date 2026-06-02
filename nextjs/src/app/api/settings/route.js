import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Settings from '@/models/Settings';

export async function GET() {
  try {
    await connectDB();
    
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = new Settings({
        siteName: 'Site Era',
        tagline: 'Premium Web & Mobile App Development Company',
        email: 'contact@siteera.com',
        hero: {
          title: 'Transform Your Digital Presence',
          subtitle: 'Premium Web & Mobile App Development',
          description: 'We craft exceptional digital experiences that drive results',
          ctaText: 'Start Your Project',
          ctaLink: '/contact'
        }
      });
      await settings.save();
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = new Settings({ ...body, updatedAt: new Date() });
      await settings.save();
    } else {
      settings = await Settings.findOneAndUpdate(
        {},
        { ...body, updatedAt: new Date() },
        { new: true }
      );
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
