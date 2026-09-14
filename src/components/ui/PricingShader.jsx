"use client";

import { useEffect, useState } from "react";
import { Shader, LinearGradient, Heatmap } from "shaders/react";

const heatStops = [
  { color: "#02010f", position: 0 },
  { color: "#2a0a8a", position: 0.2 },
  { color: "#491ca4", position: 0.45 },
  { color: "#e8632b", position: 0.7 },
  { color: "#f9e25f", position: 0.9 },
  { color: "#ffffff", position: 1 },
];

export default function PricingShader() {
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <Shader
      className="pricing-shader-canvas"
      style={{ width: "100%", height: "100%", display: "block" }}
      disableTelemetry
    >
      <LinearGradient
        colorSpace="oklab"
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        stops={[
          { color: "#1a1c38", position: 0 },
          { color: "#080912", position: 1 },
        ]}
      />
      <Heatmap
        center={{ x: 0.67, y: 0.87 }}
        scale={1.0879}
        speed={reducedMotion ? 0 : 1}
        shape={'{"type":"gem3D","radius":0.3,"height":0.32,"facets":8,"rotX":15,"rotY":0,"rotZ":0}'}
        shapeType="gem3D"
        stops={heatStops}
      />
    </Shader>
  );
}
