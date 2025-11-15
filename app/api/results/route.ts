import { NextRequest, NextResponse } from 'next/server';
import type { StoredResult } from '@/lib/types';

// In-memory store (replace with Supabase/KV for production)
const resultsStore = new Map<string, StoredResult>();

export async function POST(request: NextRequest) {
  try {
    const result: StoredResult = await request.json();
    
    if (!result.code) {
      return NextResponse.json(
        { error: 'Missing result code' },
        { status: 400 }
      );
    }

    // Store result
    resultsStore.set(result.code, result);

    // For production, use Supabase or Vercel KV:
    // await kv.set(`result:${result.code}`, result);
    // OR
    // await supabase.from('results').insert(result);

    return NextResponse.json({ success: true, code: result.code });
  } catch (error) {
    console.error('Error storing result:', error);
    return NextResponse.json(
      { error: 'Failed to store result' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json(
        { error: 'Missing result code' },
        { status: 400 }
      );
    }

    const result = resultsStore.get(code);

    // For production:
    // const result = await kv.get(`result:${code}`);
    // OR
    // const { data: result } = await supabase.from('results').select('*').eq('code', code).single();

    if (!result) {
      return NextResponse.json(
        { error: 'Result not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error retrieving result:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve result' },
      { status: 500 }
    );
  }
}

