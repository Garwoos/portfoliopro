import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { cn } from '../lib/utils';

interface ProjectCarouselProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function ProjectCarousel({ projects, onProjectClick }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const autoAdvance = useCallback(() => {
    if (!isAnimating) {
      paginate(1);
    }
  }, [isAnimating]);

  useEffect(() => {
    const timer = setInterval(autoAdvance, 5000);
    return () => clearInterval(timer);
  }, [autoAdvance]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return projects.length - 1;
      if (nextIndex >= projects.length) return 0;
      return nextIndex;
    });
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl bg-transparent dark:bg-transparent">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            setIsDragging(false);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          onAnimationComplete={handleAnimationComplete}
          className="absolute inset-0 touch-pan-y"
        >
          <div 
            className="relative h-full w-full cursor-pointer"
            onClick={() => {
              if (!isDragging) {
                onProjectClick(projects[currentIndex]);
              }
            }}
          >
            <img
              src={projects[currentIndex].image}
              alt={projects[currentIndex].title}
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e39e5]/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h2 className="text-3xl font-bold text-[#04070D]">
                {projects[currentIndex].title}
              </h2>
              <p className="mt-2 max-w-xl text-[#fffdf5]">
                {projects[currentIndex].description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {projects[currentIndex].technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-[#fffdf5]/20 px-3 py-1 text-sm text-[#fffdf5] backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition",
              index === currentIndex 
                ? "bg-[#04070D]" 
                : "bg-[#04070D]/50 hover:bg-[#04070D]/70"
            )}
            onClick={() => {
              if (!isAnimating) {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }
            }}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  );
}