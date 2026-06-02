import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Message from '@/models/Message';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const read = searchParams.get('read');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    let query = {};
    if (read !== null) query.read = read === 'true';
    
    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);
    
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const message = new Message(body);
    await message.save();
    
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
