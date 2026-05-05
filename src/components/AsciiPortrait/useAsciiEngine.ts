import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  char: string;
  fontSize: number;
  baseAlpha: number;
  currentAlpha: number;
  delay: number;
  shimmer: number;
}

interface RawParticle {
  x: number;
  y: number;
  char: string;
  alpha: number;
}

export const useAsciiEngine = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  imageSrc: string,
  fallbackSrc?: string
) => {
  const chars = " .:-=+*#%@".split("");
  const mouse = useRef({ x: -1000, y: -1000, active: false });
  const mouseTarget = useRef({ x: -1000, y: -1000 });
  const particles = useRef<Particle[]>([]);
  const dataReady = useRef(false);
  const startTime = useRef<number | null>(null);
  const animationId = useRef<number | null>(null);
  const size = useRef(450);
  const memoryCache = useRef<{ [key: number]: RawParticle[] }>({});

  const calculateSize = useCallback((width: number) => {
    if (width <= 480) return Math.min(280, width - 40);
    if (width <= 768) return Math.min(350, width - 60);
    return 450;
  }, []);

  const generateFallbackPixels = (canvasWidth: number, canvasHeight: number) => {
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d")!;
    offscreen.width = canvasWidth;
    offscreen.height = canvasHeight;
    offCtx.fillStyle = "black";
    offCtx.fillRect(0, 0, canvasWidth, canvasHeight);
    return offCtx.getImageData(0, 0, canvasWidth, canvasHeight).data;
  };

  const processImage = useCallback((img: HTMLImageElement | null, targetSize: number) => {
    const canvasWidth = targetSize;
    const canvasHeight = targetSize;
    let pixels: Uint8ClampedArray;

    if (img) {
      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d")!;
      offscreen.width = canvasWidth;
      offscreen.height = canvasHeight;

      const scale = 0.8;
      const imgAspect = img.width / img.height;
      let drawHeight = canvasHeight * scale;
      let drawWidth = drawHeight * imgAspect;

      if (drawWidth > canvasWidth * scale) {
        drawWidth = canvasWidth * scale;
        drawHeight = drawWidth / imgAspect;
      }

      const offsetX = (canvasWidth - drawWidth) / 2;
      const offsetY = (canvasHeight - drawHeight) / 2;
      offCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      pixels = offCtx.getImageData(0, 0, canvasWidth, canvasHeight).data;
    } else {
      pixels = generateFallbackPixels(canvasWidth, canvasHeight);
    }

    const rawParticles: RawParticle[] = [];
    const isMobileSize = targetSize <= 280;
    const fontSize = isMobileSize ? 5 : 7;
    const colGap = fontSize * 0.7;
    const rowGap = fontSize * 1.1;

    for (let y = 0; y < canvasHeight; y += rowGap) {
      for (let x = 0; x < canvasWidth; x += colGap) {
        const i = (Math.floor(y) * canvasWidth + Math.floor(x)) * 4;
        const a = pixels[i + 3];

        if (a > 128) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const brightness = (r + g + b) / (3 * 255);
          const charIndex = Math.floor(brightness * (chars.length - 1));
          
          rawParticles.push({
            x: Number(x.toFixed(1)),
            y: Number(y.toFixed(1)),
            char: chars[charIndex],
            alpha: Number((0.4 + brightness * 0.6).toFixed(2)),
          });
        }
      }
    }
    return rawParticles;
  }, [chars]);

  const createParticlesFromRaw = useCallback((rawParticles: RawParticle[], isMobileSize: boolean) => {
    const fontSize = isMobileSize ? 5 : 7;
    return rawParticles.map((p) => ({
      x: p.x + (Math.random() - 0.5) * 400,
      y: p.y + (Math.random() - 0.5) * 400,
      targetX: p.x,
      targetY: p.y,
      vx: 0,
      vy: 0,
      char: p.char,
      fontSize: fontSize,
      baseAlpha: p.alpha,
      currentAlpha: 0,
      delay: Math.random() * 0.4,
      shimmer: Math.random() * Math.PI * 2,
    }));
  }, []);

  const draw = useCallback(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d')!;
    animationId.current = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, size.current, size.current);

    if (!dataReady.current || !particles.current.length) return;

    const elapsed = (performance.now() - (startTime.current || 0)) / 1000;

    mouse.current.x += (mouseTarget.current.x - mouse.current.x) * 0.15;
    mouse.current.y += (mouseTarget.current.y - mouse.current.y) * 0.15;

    const isMobileSize = size.current <= 280;
    const fontSize = isMobileSize ? 5 : 7;
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    particles.current.forEach((p) => {
      const particleTime = elapsed - p.delay;
      if (particleTime < 0) return;

      const fadeProgress = Math.min(particleTime / 1.5, 1);
      const easedFade = 1 - Math.pow(1 - fadeProgress, 2);
      
      const isActive = mouse.current.active || particleTime < 3.0;
      const shimmerVal = isActive ? Math.sin(elapsed * 2 + p.shimmer) * 0.1 : 0;
      p.currentAlpha = Math.max(0, p.baseAlpha * easedFade + shimmerVal);

      const moveProgress = Math.min(particleTime / 2.5, 1);
      const easedMove = 1 - Math.pow(1 - moveProgress, 3);

      if (mouse.current.active) {
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = size.current * 0.25; 

        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 5;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      const dx = p.targetX - p.x;
      const dy = p.targetY - p.y;

      const pullStrength = 0.01 + easedMove * 0.08;
      p.vx += dx * pullStrength;
      p.vy += dy * pullStrength;

      if (isActive) {
        const breathX = Math.sin(elapsed * 0.5 + p.targetY * 0.1) * 0.15;
        const breathY = Math.cos(elapsed * 0.5 + p.targetX * 0.1) * 0.15;
        p.vx += breathX;
        p.vy += breathY;
        p.vx *= 0.92;
        p.vy *= 0.92;
      } else {
        p.vx *= 0.85;
        p.vy *= 0.85;
        
        if (particleTime > 4.0 && Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
          p.x = p.targetX;
          p.y = p.targetY;
          p.vx = 0;
          p.vy = 0;
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      ctx.fillStyle = `rgba(205, 133, 63, ${p.currentAlpha})`;
      ctx.fillText(p.char, p.x, p.y);
    });
  }, [canvasRef]);

  const loadData = useCallback(() => {
    dataReady.current = false;
    const isMobileSize = size.current <= 280;

    if (memoryCache.current[size.current]) {
      particles.current = createParticlesFromRaw(memoryCache.current[size.current], isMobileSize);
      dataReady.current = true;
      startTime.current = performance.now();
      if (animationId.current) cancelAnimationFrame(animationId.current);
      draw();
      return;
    }

    const img = new Image();
    img.src = imageSrc;
    
    img.onload = () => {
      try {
        const raw = processImage(img, size.current);
        memoryCache.current[size.current] = raw;
        particles.current = createParticlesFromRaw(raw, isMobileSize);
        dataReady.current = true;
        startTime.current = performance.now();
        if (animationId.current) cancelAnimationFrame(animationId.current);
        draw();
      } catch (e) {
        const raw = processImage(null, size.current);
        memoryCache.current[size.current] = raw;
        particles.current = createParticlesFromRaw(raw, isMobileSize);
        dataReady.current = true;
        startTime.current = performance.now();
        if (animationId.current) cancelAnimationFrame(animationId.current);
        draw();
      }
    };

    img.onerror = () => {
      if (fallbackSrc) {
        const fallbackImg = new Image();
        fallbackImg.src = fallbackSrc;
        fallbackImg.onload = () => {
          const raw = processImage(fallbackImg, size.current);
          memoryCache.current[size.current] = raw;
          particles.current = createParticlesFromRaw(raw, isMobileSize);
          dataReady.current = true;
          startTime.current = performance.now();
          if (animationId.current) cancelAnimationFrame(animationId.current);
          draw();
        };
        fallbackImg.onerror = () => {
          const raw = processImage(null, size.current);
          memoryCache.current[size.current] = raw;
          particles.current = createParticlesFromRaw(raw, isMobileSize);
          dataReady.current = true;
          startTime.current = performance.now();
          if (animationId.current) cancelAnimationFrame(animationId.current);
          draw();
        }
      } else {
        const raw = processImage(null, size.current);
        memoryCache.current[size.current] = raw;
        particles.current = createParticlesFromRaw(raw, isMobileSize);
        dataReady.current = true;
        startTime.current = performance.now();
        if (animationId.current) cancelAnimationFrame(animationId.current);
        draw();
      }
    };
  }, [imageSrc, fallbackSrc, processImage, createParticlesFromRaw, draw]);

  useEffect(() => {
    const handleResize = () => {
      const newSize = calculateSize(window.innerWidth);
      if (newSize !== size.current) {
        size.current = newSize;
        if (canvasRef.current) {
          const dpr = window.devicePixelRatio || 1;
          canvasRef.current.style.width = `${size.current}px`;
          canvasRef.current.style.height = `${size.current}px`;
          canvasRef.current.width = size.current * dpr;
          canvasRef.current.height = size.current * dpr;
          const ctx = canvasRef.current.getContext('2d')!;
          ctx.scale(dpr, dpr);
        }
        loadData();
      }
    };

    window.addEventListener("resize", handleResize);
    
    // Initial setup
    size.current = calculateSize(window.innerWidth);
    if (canvasRef.current) {
      const dpr = window.devicePixelRatio || 1;
      canvasRef.current.style.width = `${size.current}px`;
      canvasRef.current.style.height = `${size.current}px`;
      canvasRef.current.width = size.current * dpr;
      canvasRef.current.height = size.current * dpr;
      const ctx = canvasRef.current.getContext('2d')!;
      ctx.scale(dpr, dpr);
    }
    loadData();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId.current) cancelAnimationFrame(animationId.current);
    };
  }, [canvasRef, calculateSize, loadData]);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    let x, y;
    if ('clientX' in e) {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    } else {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    }
    mouseTarget.current.x = x;
    mouseTarget.current.y = y;
    mouse.current.active = true;
  };

  const handleMouseLeave = () => {
    mouse.current.active = false;
    mouseTarget.current.x = -1000;
    mouseTarget.current.y = -1000;
  };

  return {
    handleMouseMove,
    handleMouseLeave
  };
};
