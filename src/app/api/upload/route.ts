import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Authenticate request here if needed.
        return {
          allowedContentTypes: [
            'application/pdf', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
            'application/msword', 
            'image/jpeg', 
            'image/png'
          ],
          maximumSizeInBytes: 150 * 1024 * 1024, // Allow up to 150 MB
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // We already save to the database securely via Server Action on the client,
        // so we don't strictly need to do it here for this architecture.
        console.log('Upload completed:', blob.url);
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
