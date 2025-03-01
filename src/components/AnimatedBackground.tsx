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
  const offscreenCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const animationFrameRef = useRef<number>();
  const buildingsRef = useRef<Building[]>([]);
  const starsRef = useRef<Float32Array>(new Float32Array(0));
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [initialized, setInitialized] = useState(false);
  const frameCountRef = useRef(0);

  // Precompute sine values for twinkle effect
  const sineLookup = new Float32Array(360);
  for (let i = 0; i < 360; i++) {
    sineLookup[i] = Math.sin((i * Math.PI) / 180);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const offscreenCanvas = offscreenCanvasRef.current;
    if (!canvas || !offscreenCanvas) return;

    const ctx = canvas.getContext('2d');
    const offscreenCtx = offscreenCanvas.getContext('2d');
    if (!ctx || !offscreenCtx) return;

    const image = new Image();
    image.src = 'minimoiquidort.png';
    image.onload = () => {
      imageRef.current = image;
    };

    const initializeStars = () => {
      const starCount = 300;
      const stars = new Float32Array(starCount * 5); // x, y, size, brightness, twinkleOffset

      for (let i = 0; i < starCount; i++) {
        stars[i * 5] = Math.random() * canvas.width;
        stars[i * 5 + 1] = Math.random() * canvas.height * 0.7;
        stars[i * 5 + 2] = Math.random() * 2;
        stars[i * 5 + 3] = 0.5 + Math.random() * 0.5;
        stars[i * 5 + 4] = Math.random() * 360; // Use degrees for lookup
      }
      starsRef.current = stars;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      offscreenCanvas.width = window.innerWidth;
      offscreenCanvas.height = window.innerHeight;
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

    const isWindowHidden = (window: Window, buildings: Building[], currentBuilding: Building) => {
      return buildings.some(building => {
        if (building === currentBuilding) return false;

        const isInFront = building.layer > currentBuilding.layer;

        return (
          isInFront &&
          building.x < window.x + window.size &&
          building.x + building.width > window.x &&
          canvas.height - building.height < window.y + window.size &&
          canvas.height > window.y
        );
      });
    };

    const isStarHidden = (starX: number, starY: number, buildings: Building[], image: HTMLImageElement | null) => {
      const isHiddenByBuilding = buildings.some(building => {
        return (
          starX > building.x &&
          starX < building.x + building.width &&
          starY > canvas.height - building.height
        );
      });

      const isHiddenByImage = image
        ? starX > canvas.width - image.width / 1.7 &&
          starY > canvas.height - image.height
        : false;

      return isHiddenByBuilding || isHiddenByImage;
    };

    const drawBuilding = (building: Building, time: number) => {
      if (!offscreenCtx) return;

      const baseColor = building.color;
      offscreenCtx.fillStyle = baseColor;
      offscreenCtx.globalAlpha = 1; // Set opacity to 1 (fully opaque)
      offscreenCtx.fillRect(building.x, canvas.height - building.height, building.width, building.height);

      building.windows.forEach(window => {
        if (isWindowHidden(window, buildingsRef.current, building)) return;

        if (window.isLit) {
          const twinkle = sineLookup[Math.floor((time / (5000 / window.blinkPhase) + window.blinkPhase) % 360)];
          const brightness = window.shouldBlink
            ? (twinkle * 0.5 + 0.5) * window.brightness
            : window.brightness;

          offscreenCtx.fillStyle = `rgba(255, 255, 200, ${brightness})`;
          offscreenCtx.fillRect(window.x, window.y, window.size, window.size);

          const haloSize = window.size * (building.layer === 1 ? 1.5 : building.layer === 2 ? 2 : 2.5);
          const gradient = offscreenCtx.createRadialGradient(
            window.x + window.size / 2, window.y + window.size / 2, 0,
            window.x + window.size / 2, window.y + window.size / 2, haloSize
          );
          gradient.addColorStop(0, `rgba(255, 255, 200, ${brightness * 0.2})`);
          gradient.addColorStop(1, 'rgba(255, 255, 200, 0)');
          offscreenCtx.fillStyle = gradient;
          offscreenCtx.fillRect(
            window.x - haloSize / 2,
            window.y - haloSize / 2,
            haloSize * 2,
            haloSize * 2
          );
        } else {
          offscreenCtx.fillStyle = `rgba(20, 20, 30, 0.8)`;
          offscreenCtx.fillRect(window.x, window.y, window.size, window.size);
        }
      });
    };

    const animate = (time: number) => {
      frameCountRef.current++;
      if (frameCountRef.current % 2 !== 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

      const gradient = offscreenCtx.createLinearGradient(0, 0, 0, offscreenCanvas.height);
      gradient.addColorStop(0, '#0a1525');
      gradient.addColorStop(0.5, '#0c1a2a');
      gradient.addColorStop(1, '#0e1f30');
      offscreenCtx.fillStyle = gradient;
      offscreenCtx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

      const nebulaGradient = offscreenCtx.createRadialGradient(
        offscreenCanvas.width * 0.75, offscreenCanvas.height * 0.25, 0,
        offscreenCanvas.width * 0.75, offscreenCanvas.height * 0.25, offscreenCanvas.width * 0.5
      );
      nebulaGradient.addColorStop(0, 'rgba(128, 0, 128, 0.4)');
      nebulaGradient.addColorStop(0.5, 'rgba(0, 0, 255, 0.3)');
      nebulaGradient.addColorStop(1, 'rgba(255, 0, 255, 0.2)');
      offscreenCtx.fillStyle = nebulaGradient;
      offscreenCtx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i += 5) {
        const starX = stars[i];
        const starY = stars[i + 1];
        const starSize = stars[i + 2];
        const starBrightness = stars[i + 3];
        const starTwinkleOffset = stars[i + 4];

        if (isStarHidden(starX, starY, buildingsRef.current, null)) continue; // Ignore image for star visibility

        const twinkle = sineLookup[Math.floor((time / (1000 / starTwinkleOffset) + starTwinkleOffset) % 360)];
        const currentBrightness = starBrightness * (0.7 + twinkle * 0.3);

        const gradient = offscreenCtx.createRadialGradient(
          starX, starY, 0,
          starX, starY, starSize * 4
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentBrightness})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${currentBrightness * 0.3})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        offscreenCtx.fillStyle = gradient;
        offscreenCtx.fillRect(
          starX - starSize * 4,
          starY - starSize * 4,
          starSize * 8,
          starSize * 8
        );

        offscreenCtx.fillStyle = `rgba(255, 255, 255, ${currentBrightness})`;
        offscreenCtx.beginPath();
        offscreenCtx.arc(starX, starY, starSize, 0, Math.PI * 2);
        offscreenCtx.fill();
      }

      [1, 2, 3].forEach(layer => {
        buildingsRef.current
          .filter(b => b.layer === layer)
          .forEach(building => drawBuilding(building, time));
      });

      if (showHill && imageRef.current) {
        const imageWidth = imageRef.current.width / 2;
        const imageHeight = imageRef.current.height / 2;
        offscreenCtx.drawImage(imageRef.current, offscreenCanvas.width - imageWidth/1.7, offscreenCanvas.height - imageHeight, imageWidth, imageHeight);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(offscreenCanvas, 0, 0);

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