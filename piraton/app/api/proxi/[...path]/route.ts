import { NextRequest, NextResponse } from 'next/server';

const BACKEND_INTERNAL_URL = process.env.BACKEND_INTERNAL_URL;

async function handleProxy(
  req: NextRequest, 
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  
  // Limpiamos la ruta para asegurar que no se repita la palabra 'proxy'
  const filteredPath = resolvedParams.path.filter(p => p !== 'proxy');
  const targetPath = filteredPath.join('/');
  const searchParams = req.nextUrl.search;

  const targetUrl = `${BACKEND_INTERNAL_URL}/${targetPath}${searchParams}`;

  const headers = new Headers(req.headers);
  headers.delete('host');

  try {
    const body = ['GET', 'HEAD'].includes(req.method) ? undefined : await req.arrayBuffer();

    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      // @ts-ignore
      duplex: 'half',
    });

    const data = await response.arrayBuffer();
    const responseHeaders = new Headers(response.headers);

    return new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Error enviando petición al backend interno:', error);
    return NextResponse.json(
      { error: 'Error de comunicación con el backend interno' },
      { status: 502 }
    );
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const PATCH = handleProxy;
export const DELETE = handleProxy;