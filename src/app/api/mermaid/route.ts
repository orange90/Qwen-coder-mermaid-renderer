import { NextRequest } from 'next/server';
import mermaid from 'mermaid';

// 初始化Mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  fontFamily: 'HanyiSentyPea, Hand, Arial, Helvetica, sans-serif',
});

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    
    if (!code) {
      return new Response('Missing code parameter', { status: 400 });
    }
    
    // 渲染Mermaid图表
    const { svg } = await mermaid.render('mermaid-diagram', code);
    
    // 返回SVG
    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  } catch (error: unknown) {
    console.error('Error rendering Mermaid diagram:', error);
    // 返回更详细的错误信息
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(`Error rendering diagram: ${errorMessage}`, { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}

export async function GET() {
  return new Response('Mermaid renderer API is running here', { status: 200 });
} 