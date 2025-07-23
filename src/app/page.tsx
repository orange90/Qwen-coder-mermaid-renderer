"use client";

import { useState, useRef, useEffect } from 'react';
import mermaid from 'mermaid';

export default function Home() {
  const [mermaidCode, setMermaidCode] = useState<string>(`graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]`);
  const [svg, setSvg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const svgContainerRef = useRef<HTMLDivElement>(null);

  // 初始化Mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      fontFamily: 'HanyiSentyPea, Hand, Arial, Helvetica, sans-serif',
      // 设置黑色字体
      themeCSS: `
        g {
          fill: #000000;
          color: #000000;
        }
        .actor {
          fill: #000000;
          stroke: #000000;
          stroke-width: 1px;
          color: #000000;
        }
        .actor text {
          fill: #000000;
          stroke: #000000;
          stroke-width: 1px;
          color: #000000;
        }
        .node rect {
          fill: #ffffff;
          stroke: #000000;
          stroke-width: 1px;
        }
        .node circle {
          fill: #ffffff;
          stroke: #000000;
          stroke-width: 1px;
        }
        .node ellipse {
          fill: #ffffff;
          stroke: #000000;
          stroke-width: 1px;
        }
        .node polygon {
          fill: #ffffff;
          stroke: #000000;
          stroke-width: 1px;
        }
        .node path {
          stroke: #000000;
          stroke-width: 1px;
        }
        .node text {
          fill: #000000;
          stroke: #000000;
          stroke-width: 1px;
          color: #000000;
        }
        .edgePath path {
          stroke: #000000;
          stroke-width: 1px;
        }
        .edgeLabel text {
          fill: #000000;
          stroke: #000000;
          stroke-width: 1px;
          color: #000000;
        }
      `,
    });
  }, []);

  const renderDiagram = async () => {
    setLoading(true);
    setError('');
    try {
      // 渲染Mermaid图表
      const { svg } = await mermaid.render('mermaid-diagram', mermaidCode);
      setSvg(svg);
    } catch (err) {
      console.error('Error rendering diagram:', err);
      setError('Error rendering diagram: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const downloadSvg = () => {
    if (!svg) return;
    
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mermaid-diagram.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Mermaid 图表渲染器
        </h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">输入 Mermaid 代码</h2>
          <textarea
            className="w-full h-64 p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
            value={mermaidCode}
            onChange={(e) => setMermaidCode(e.target.value)}
            placeholder="在此输入 Mermaid 代码..."
          />
          <div className="mt-4 flex justify-end space-x-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setMermaidCode('')}
            >
              清空
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={renderDiagram}
              disabled={loading}
            >
              {loading ? '渲染中...' : '渲染图表'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">错误: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {svg && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">渲染结果</h2>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={downloadSvg}
              >
                下载 SVG
              </button>
            </div>
            <div 
              ref={svgContainerRef}
              className="border border-gray-200 rounded-md p-4 flex justify-center overflow-auto"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
