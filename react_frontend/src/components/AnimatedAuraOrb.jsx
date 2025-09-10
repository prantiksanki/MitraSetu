import React, { useEffect, useRef } from 'react';

/* Futuristic animated aura orb.
   Renders a canvas with layered radial gradients that subtly move.
   'level' (0..1) influences pulse radius/intensity.
*/
export default function AnimatedAuraOrb({ size = 220, level = 0, accent = '#c6a3ff' }) {
  const canvasRef = useRef(null);
  const tRef = useRef(0);

  useEffect(()=>{
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    let frame;
    const render = () => {
      tRef.current += 0.015;
      const t = tRef.current;
      const w = canvas.width;
      ctx.clearRect(0,0,w,w);
      ctx.globalCompositeOperation = 'lighter';
      const baseR = w * 0.32;
      const pulse = baseR + Math.sin(t*2) * 6 + level * 28;

      const accentRGB = '198,163,255'; // from accent hex approximate
      const gradients = [
        { colorStops: [[`rgba(${accentRGB},0.06)`,0], [`rgba(${accentRGB},0.22)`,0.55], ['rgba(255,255,255,0)',1]], r: pulse*1.45, ox: Math.sin(t*0.6)*8, oy: Math.cos(t*0.6)*8 },
        { colorStops: [[`rgba(${accentRGB},0.25)`,0], ['rgba(255,192,203,0.10)',0.55], ['rgba(255,255,255,0)',1]], r: pulse, ox: Math.cos(t*0.8)*10, oy: Math.sin(t*0.8)*10 },
        { colorStops: [['rgba(255,255,255,0.65)',0], ['rgba(255,255,255,0.05)',1]], r: baseR*0.6 + level*40, ox:0, oy:0 }
      ];

      gradients.forEach(g => {
        const grad = ctx.createRadialGradient(w/2+g.ox, w/2+g.oy, 0, w/2+g.ox, w/2+g.oy, g.r);
        g.colorStops.forEach(cs => grad.addColorStop(cs[1], cs[0]));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(w/2+g.ox, w/2+g.oy, g.r, 0, Math.PI*2);
        ctx.fill();
      });

      // Soft center nucleus
      const nucleus = ctx.createRadialGradient(w/2, w/2, 0, w/2, w/2, baseR*0.9);
      nucleus.addColorStop(0, 'rgba(255,255,255,0.85)');
      nucleus.addColorStop(0.5, 'rgba(255,255,255,0.25)');
      nucleus.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = nucleus;
      ctx.beginPath();
      ctx.arc(w/2, w/2, baseR*0.95, 0, Math.PI*2);
      ctx.fill();

      frame = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(frame);
  }, [size, level]);

  return (
    <div style={{width:size,height:size}} className="relative select-none">
      <canvas ref={canvasRef} className="w-full h-full"/>
      <div className="absolute inset-0 rounded-full backdrop-blur-md"/>
    </div>
  );
}
