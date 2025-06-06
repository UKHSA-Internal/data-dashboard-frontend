import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const secret = searchParams.get('secret')

    // Verify the secret for secure access
    if (secret !== process.env.REVALIDATE_SECRET) {
      return new Response(JSON.stringify({ message: 'Invalid secret' }), { status: 401 })
    }

    revalidatePath('/', 'layout')

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    console.error('Error during cache revalidation:', err)
    return NextResponse.json({ message: 'Error revalidating', error: err }, { status: 500 })
  }
}
