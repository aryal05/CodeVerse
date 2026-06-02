'use client';

const MarqueeStrip = ({ text, speed = 25, className = '' }) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="inline-block"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        <span className="inline-block px-4">{text}</span>
        <span className="inline-block px-4">{text}</span>
      </div>
    </div>
  );
};

export default MarqueeStrip;

