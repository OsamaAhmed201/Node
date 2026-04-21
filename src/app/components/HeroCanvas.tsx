import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
  pulseSpeed: number;
  isHub: boolean;
  layer: number;
}

interface Signal {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  trail: { x: number; y: number; a: number }[];
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const signalsRef = useRef<Signal[]>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      initNodes(w, h);
    };

    const initNodes = (w: number, h: number) => {
      const nodes: Node[] = [];

      // Hub nodes — strategic positions
      const hubs = [
        { x: w * 0.5, y: h * 0.5, layer: 0 },
        { x: w * 0.22, y: h * 0.28, layer: 1 },
        { x: w * 0.78, y: h * 0.28, layer: 1 },
        { x: w * 0.2, y: h * 0.72, layer: 1 },
        { x: w * 0.8, y: h * 0.72, layer: 1 },
        { x: w * 0.5, y: h * 0.12, layer: 2 },
        { x: w * 0.5, y: h * 0.88, layer: 2 },
      ];

      hubs.forEach((p) => {
        nodes.push({
          x: p.x + (Math.random() - 0.5) * 20,
          y: p.y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: p.layer === 0 ? 7 : p.layer === 1 ? 5 : 4,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.008 + Math.random() * 0.01,
          isHub: true,
          layer: p.layer,
        });
      });

      // Regular nodes
      for (let i = 0; i < 22; i++) {
        nodes.push({
          x: w * 0.06 + Math.random() * w * 0.88,
          y: h * 0.06 + Math.random() * h * 0.88,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          r: 1.8 + Math.random() * 2,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.015,
          isHub: false,
          layer: 3,
        });
      }

      nodesRef.current = nodes;

      // Init signals
      const sigs: Signal[] = [];
      for (let i = 0; i < 16; i++) {
        const from = Math.floor(Math.random() * nodes.length);
        let to = Math.floor(Math.random() * nodes.length);
        while (to === from) to = Math.floor(Math.random() * nodes.length);
        sigs.push({
          fromIdx: from,
          toIdx: to,
          progress: Math.random(),
          speed: 0.0025 + Math.random() * 0.003,
          trail: [],
        });
      }
      signalsRef.current = sigs;
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const t = frameRef.current;
      const maxDist = Math.min(w * 0.27, 230);

      // Subtle dot grid
      ctx.fillStyle = "rgba(0,146,69,0.04)";
      const spacing = 44;
      for (let x = 0; x <= w; x += spacing) {
        for (let y = 0; y <= h; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,146,69,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Signals
      signalsRef.current.forEach((sig) => {
        const from = nodes[sig.fromIdx];
        const to = nodes[sig.toIdx];
        if (!from || !to) return;
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > maxDist * 1.1) return;

        const px = from.x + dx * sig.progress;
        const py = from.y + dy * sig.progress;

        // Glow halo
        const g = ctx.createRadialGradient(px, py, 0, px, py, 10);
        g.addColorStop(0, "rgba(0,146,69,0.75)");
        g.addColorStop(0.5, "rgba(0,146,69,0.18)");
        g.addColorStop(1, "rgba(0,146,69,0)");
        ctx.beginPath();
        ctx.arc(px, py, 10, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "#009245";
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(px, py, 1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.fill();
      });

      // Nodes
      nodes.forEach((node) => {
        const pulseFactor = Math.sin(node.pulse) * 0.25 + 1;
        const r = node.r * pulseFactor;
        const glowAlpha = (Math.sin(node.pulse) + 1) / 2;

        if (node.isHub) {
          // Outer glow ring
          const glowR = r * (node.layer === 0 ? 5 : 4);
          const grd = ctx.createRadialGradient(node.x, node.y, r, node.x, node.y, glowR);
          grd.addColorStop(0, `rgba(0,146,69,${0.08 + glowAlpha * 0.07})`);
          grd.addColorStop(1, "rgba(0,146,69,0)");
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // Ring stroke
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 2.4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,146,69,${0.12 + glowAlpha * 0.08})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Node body
        const bodyGrd = ctx.createRadialGradient(
          node.x - r * 0.3, node.y - r * 0.3, 0,
          node.x, node.y, r * 1.5
        );
        const alpha = node.isHub ? 0.95 : 0.65 + glowAlpha * 0.2;
        bodyGrd.addColorStop(0, `rgba(70,210,110,${alpha})`);
        bodyGrd.addColorStop(0.5, `rgba(0,146,69,${alpha * 0.8})`);
        bodyGrd.addColorStop(1, `rgba(30,120,60,${alpha * 0.3})`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = bodyGrd;
        ctx.fill();

        // Node rim
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = node.isHub ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)";
        ctx.lineWidth = node.isHub ? 1.2 : 0.6;
        ctx.stroke();
      });

      // Decorative hex outlines at corners
      const hexes = [
        { x: w * 0.08, y: h * 0.12, s: 18, a: 0.05 + Math.sin(t * 0.007) * 0.015 },
        { x: w * 0.93, y: h * 0.15, s: 14, a: 0.04 + Math.sin(t * 0.009 + 1) * 0.012 },
        { x: w * 0.05, y: h * 0.82, s: 16, a: 0.05 + Math.sin(t * 0.006 + 2) * 0.015 },
        { x: w * 0.94, y: h * 0.85, s: 20, a: 0.04 + Math.sin(t * 0.008 + 3) * 0.012 },
        { x: w * 0.5, y: h * 0.05, s: 13, a: 0.035 + Math.sin(t * 0.01 + 4) * 0.01 },
      ];
      hexes.forEach(({ x, y, s, a }) => {
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const angle = (Math.PI / 3) * k - Math.PI / 6;
          const hx = x + s * Math.cos(angle);
          const hy = y + s * Math.sin(angle);
          if (k === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(0,146,69,${a * 2})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.fillStyle = `rgba(0,146,69,${a * 0.5})`;
        ctx.fill();
      });

      frameRef.current++;
    };

    const update = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const nodes = nodesRef.current;
      const margin = 40;

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;
        if (node.x < margin || node.x > w - margin) node.vx *= -1;
        if (node.y < margin || node.y > h - margin) node.vy *= -1;
        node.x = Math.max(margin, Math.min(w - margin, node.x));
        node.y = Math.max(margin, Math.min(h - margin, node.y));
      });

      const sigs = signalsRef.current;
      sigs.forEach((sig) => {
        sig.progress += sig.speed;
        if (sig.progress >= 1) {
          sig.progress = 0;
          sig.fromIdx = sig.toIdx;
          const candidates = Array.from({ length: nodes.length }, (_, i) => i).filter(
            (i) => i !== sig.fromIdx
          );
          sig.toIdx = candidates[Math.floor(Math.random() * candidates.length)];
        }
      });
    };

    const loop = () => {
      update();
      draw();
      animRef.current = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
