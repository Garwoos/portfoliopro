import React, { useEffect, useRef, useState } from 'react';

interface Building {
  x: number;
  width: number;
  height: number;
  color: string;
  windows: Window[];
  layer: number;
}

interface Window {
  x: number;
  y: number;
  size: number;
  isLit: boolean;
  brightness: number;
  blinkPhase: number;
  shouldBlink: boolean;
}

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface AnimatedBackgroundProps {
  showHill: boolean;
  className?: string;
  buildings: Building[];
  style?: React.CSSProperties;
}

export function AnimatedBackground({ showHill, className, buildings, style }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const buildingsRef = useRef<Building[]>([]);
  const starsRef = useRef<Star[]>([]);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const leavesRef = useRef<{ x: number; y: number; size: number }[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = 'minimoiquidort.png';
    image.onload = () => {
      imageRef.current = image;
    };

    const initializeStars = () => {
      const stars: Star[] = [];
      const starCount = 500;

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.7,
          size: Math.random() * 2,
          brightness: 0.5 + Math.random() * 0.5,
          twinkleSpeed: 1 + Math.random() * 2,
          twinkleOffset: Math.random() * Math.PI * 2
        });
      }
      starsRef.current = stars;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (!initialized) {
        initializeBuildings();
        initializeStars();
        setInitialized(true);
      }
    };

    const createWindows = (building: Building) => {
      const windows: Window[] = [];
      const windowSize = building.layer === 1 ? 6 : building.layer === 2 ? 8 : 10;
      const windowSpacing = building.layer === 1 ? 14 : building.layer === 2 ? 18 : 22;

      for (let wx = building.x + windowSpacing; wx < building.x + building.width - windowSpacing; wx += windowSpacing) {
        const numFloors = Math.floor((building.height - windowSpacing * 2) / windowSpacing);
        for (let floor = 0; floor < numFloors; floor++) {
          const wy = canvas.height - building.height + windowSpacing + (floor * windowSpacing);
          const shouldBlink = Math.random() < 0.55;
          windows.push({
            x: wx,
            y: wy,
            size: windowSize,
            isLit: Math.random() > 0.4,
            brightness: Math.random() > 0.4 ? 0.7 + Math.random() * 0.5 : 0.3 + Math.random() * 0.2,
            blinkPhase: Math.random() * Math.PI * 2,
            shouldBlink
          });
        }
      }
      return windows;
    };

    const initializeBuildings = () => {
      const buildings: Building[] = [];
      const layers = [
        {
          count: 4,
          heightRange: [0.75, 0.95],
          widthRange: [250, 350],
          colors: ['#0a1525', '#0c1a2a', '#0e1f30'],
          spacing: 50
        },
        {
          count: 6,
          heightRange: [0.45, 0.65],
          widthRange: [180, 250],
          colors: ['#112436', '#142a3d', '#173045'],
          spacing: 30
        },
        {
          count: 8,
          heightRange: [0.25, 0.35],
          widthRange: [120, 180],
          colors: ['#1a2f4a', '#1d3553', '#203b5c'],
          spacing: 20
        }
      ];

      layers.forEach((layer, layerIndex) => {
        let currentX = -50;
        const baseY = canvas.height;

        for (let i = 0; i < layer.count; i++) {
          const width = Math.random() * (layer.widthRange[1] - layer.widthRange[0]) + layer.widthRange[0];
          const height = (Math.random() * (layer.heightRange[1] - layer.heightRange[0]) + layer.heightRange[0]) * canvas.height;
          const xOffset = (Math.random() - 0.5) * 30;
          const x = currentX + xOffset;

          currentX += width + layer.spacing;

          const building: Building = {
            x,
            width,
            height,
            color: layer.colors[Math.floor(Math.random() * layer.colors.length)],
            windows: createWindows({ x, width, height, color: '', windows: [], layer: layerIndex + 1 }),
            layer: layerIndex + 1
          };

          buildings.push(building);
        }
      });

      buildingsRef.current = buildings;
    };

    const drawBuilding = (building: Building, time: number) => {
      if (!ctx) return;

      const fogFactor = building.layer === 1 ? 0.8 : building.layer === 2 ? 0.9 : 1;
      const baseColor = building.color;
      ctx.fillStyle = baseColor;
      ctx.globalAlpha = fogFactor;
      ctx.fillRect(building.x, canvas.height - building.height, building.width, building.height);
      ctx.globalAlpha = 1;

      building.windows.forEach(window => {
        if (window.isLit) {
          const twinkle = Math.sin(time / (5000 / window.blinkPhase) + window.blinkPhase);
          const brightness = window.shouldBlink
            ? (twinkle * 0.5 + 0.5) * window.brightness * fogFactor
            : window.brightness * fogFactor;

          ctx.fillStyle = `rgba(255, 255, 200, ${brightness})`;
          ctx.fillRect(window.x, window.y, window.size, window.size);

          const haloSize = window.size * (building.layer === 1 ? 1.5 : building.layer === 2 ? 2 : 2.5);
          const gradient = ctx.createRadialGradient(
            window.x + window.size / 2, window.y + window.size / 2, 0,
            window.x + window.size / 2, window.y + window.size / 2, haloSize
          );
          gradient.addColorStop(0, `rgba(255, 255, 200, ${brightness * 0.2})`);
          gradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(
            window.x - haloSize / 2,
            window.y - haloSize / 2,
            haloSize * 2,
            haloSize * 2
          );
        } else {
          ctx.fillStyle = `rgba(20, 20, 30, ${0.8 * fogFactor})`;
          ctx.fillRect(window.x, window.y, window.size, window.size);
        }
      });
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a1525');
      gradient.addColorStop(0.5, '#0c1a2a');
      gradient.addColorStop(1, '#0e1f30');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nebulaGradient = ctx.createRadialGradient(
        canvas.width * 0.75, canvas.height * 0.25, 0,
        canvas.width * 0.75, canvas.height * 0.25, canvas.width * 0.5
      );
      nebulaGradient.addColorStop(0, 'rgba(128, 0, 128, 0.4)');
      nebulaGradient.addColorStop(0.5, 'rgba(0, 0, 255, 0.3)');
      nebulaGradient.addColorStop(1, 'rgba(255, 0, 255, 0.2)');
      ctx.fillStyle = nebulaGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach(star => {
        const twinkle = Math.sin(time / (1000 / star.twinkleSpeed) + star.twinkleOffset);
        const currentBrightness = star.brightness * (0.7 + twinkle * 0.3);

        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 4
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentBrightness})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${currentBrightness * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(
          star.x - star.size * 4,
          star.y - star.size * 4,
          star.size * 8,
          star.size * 8
        );

        ctx.fillStyle = `rgba(255, 255, 255, ${currentBrightness})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      [1, 2, 3].forEach(layer => {
        buildingsRef.current
          .filter(b => b.layer === layer)
          .forEach(building => drawBuilding(building, time));
      });

      if (showHill && imageRef.current) {
        const imageWidth = imageRef.current.width / 2;
        const imageHeight = imageRef.current.height / 2;
        ctx.drawImage(imageRef.current, canvas.width - imageWidth/1.7, canvas.height - imageHeight, imageWidth, imageHeight);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate(0);

    window.addEventListener('resize', resizeCanvas);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [showHill]);

  return <canvas ref={canvasRef} className={`fixed inset-0 -z-10 pointer-events-none ${className}`} style={style} />;
}