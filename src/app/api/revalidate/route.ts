import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET() {
  // Check for a secret token to validate the request (optional)
  // const secret = req.nextUrl.searchParams.get('secret')

  // Optional: If you want to secure revalidation, add a secret token
  // if (secret !== process.env.MY_SECRET_TOKEN) {
  //   return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  // }

  try {
    // Trigger a revalidation of the entire site by revalidating the homepage and all other dynamic paths
    // For Next.js 13+, you can use `revalidatePath` for specific paths or tags.
    await revalidatePath('/')

    // Optionally, trigger revalidation for any specific paths
    // await revalidatePath('/about');
    // await revalidatePath('/blog/[slug]');

    // Optionally, trigger tag-based revalidation
    // await revalidateTag('posts');
    // await revalidateTag('products');

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: err }, { status: 500 })
  }
}
