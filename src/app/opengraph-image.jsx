import { ImageResponse } from 'next/og';

export const alt = 'CodeVerse Build — IT company in Nepal';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px', color: 'white', background: 'linear-gradient(135deg, #030712 0%, #111827 55%, #1d4ed8 140%)', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', fontSize: 30, fontWeight: 700, letterSpacing: '-0.5px' }}>CodeVerse <span style={{ color: '#60a5fa', marginLeft: 8 }}>Build</span></div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 70, lineHeight: 1.05, fontWeight: 800, letterSpacing: '-3px', maxWidth: 980 }}>
          <div>IT company in Nepal.</div>
          <div>Built for ambitious ideas.</div>
        </div>
        <div style={{ display: 'flex', marginTop: 32, fontSize: 27, color: '#cbd5e1' }}>Web development · Mobile apps · UI/UX design</div>
      </div>
      <div style={{ display: 'flex', fontSize: 22, color: '#93c5fd' }}>codeversebuild.com · Kathmandu, Nepal</div>
    </div>,
    size,
  );
}
