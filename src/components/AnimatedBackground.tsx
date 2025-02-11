import React, { useEffect, useRef, useState } from 'react';

interface Sprite {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  isDragging?: boolean;
}

interface AnimatedBackgroundProps {
  density?: number;
}

export function AnimatedBackground({ density = 5 }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spritesRef = useRef<Sprite[]>([]);
  const animationFrameRef = useRef<number>();
  const [draggingSprite, setDraggingSprite] = useState<Sprite | null>(null);
  const [lastMousePos, setLastMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = `${import.meta.env.BASE_URL}minimoi.png`; // Assurez-vous que le chemin est correct

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createSprites = () => {
      const spriteCount = density + 10;
      spritesRef.current = Array.from({ length: spriteCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
        size: Math.random() * 50 + 50, // Taille des images
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas

      ctx.fillStyle = 'rgba(64, 156, 255, 0.6)'; // Couleur de fond actuelle
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      spritesRef.current.forEach(sprite => {
        if (!sprite.isDragging) {
          sprite.x += sprite.dx;
          sprite.y += sprite.dy;
          sprite.rotation += sprite.rotationSpeed;

          if (sprite.x < 0 || sprite.x > canvas.width) sprite.dx *= -1;
          if (sprite.y < 0 || sprite.y > canvas.height) sprite.dy *= -1;
        }

        ctx.save();
        ctx.translate(sprite.x, sprite.y);
        ctx.rotate((sprite.rotation * Math.PI) / 180);
        ctx.drawImage(image, -sprite.size / 2, -sprite.size / 2, sprite.size, sprite.size);
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseDown = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      spritesRef.current.forEach(sprite => {
        const distance = Math.sqrt((x - sprite.x) ** 2 + (y - sprite.y) ** 2);
        if (distance < sprite.size / 2) {
          sprite.isDragging = true;
          setDraggingSprite(sprite);
          setLastMousePos({ x, y });
        }
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (draggingSprite && lastMousePos) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        draggingSprite.dx = x - lastMousePos.x;
        draggingSprite.dy = y - lastMousePos.y;
        draggingSprite.x = x;
        draggingSprite.y = y;
        setLastMousePos({ x, y });
      }
    };

    const handleMouseUp = () => {
      if (draggingSprite) {
        draggingSprite.isDragging = false;
        setDraggingSprite(null);
        setLastMousePos(null);
      }
    };

    resizeCanvas();
    createSprites();
    animate();

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', () => {
      resizeCanvas();
      createSprites();
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [density, draggingSprite, lastMousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-auto"
    />
  );
}