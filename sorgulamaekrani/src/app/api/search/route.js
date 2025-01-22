import { NextResponse } from 'next/server';

export async function GET(req) {
  // Gelen URL'den query parametresini al
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  // API'ye istek yapılacak URL
  const apiUrl = `https://ai-yks.uskudar.dev/query?token=a8f5f167f44f4964e6c998dee827110c&query=${encodeURIComponent(query)}`;

  try {
    // API'ye istek yap
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Başarılı yanıt döndür
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);

    // Hata durumunda yanıt döndür
    return NextResponse.json({ error: 'API çağrısı başarısız oldu' }, { status: 500 });
  }
}
