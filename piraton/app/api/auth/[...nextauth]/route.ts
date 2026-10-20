import { NextRequest, NextResponse } from 'next/server';

// Dirección interna de Docker donde responde NestJS
const BACKEND_INTERNAL_URL =
  process.env.BACKEND_INTERNAL_URL ;

async function handleProxy(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const targetPath = path.join('/');
  const searchParams = req.nextUrl.search;

  const targetUrl = `${BACKEND_INTERNAL_URL}/${targetPath}${searchParams}`;

  const headers = new Headers(req.headers);
  // Eliminamos el host para que el backend no rechace la petición
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