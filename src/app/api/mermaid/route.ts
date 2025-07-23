import { NextRequest } from 'next/server';
import mermaid from 'mermaid';
import { ImageResponse } from '@vercel/og';

// 初始化Mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  fontFamily: 'HanyiSentyPea, Hand, Arial, Helvetica, sans-serif',
  // 使用手写字体
  themeCSS: `
    @font-face {
      font-family: 'HanyiSentyPea';
      src: url('/fonts/HanyiSentyPea.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    
    @font-face {
      font-family: 'Hand';
      src: url('/fonts/HANDM___.TTF') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    
    g {
      font-family: 'HanyiSentyPea', 'Hand', Arial, Helvetica, sans-serif;
    }
  `,
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
  } catch (error) {
    console.error('Error rendering Mermaid diagram:', error);
    return new Response('Error rendering diagram', { status: 500 });
  }
}

export async function GET() {
  return new Response('Mermaid renderer API is running here', { status: 200 });
} 