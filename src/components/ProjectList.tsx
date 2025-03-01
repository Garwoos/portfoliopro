import React, { useState, useEffect, memo } from 'react';
import { Project } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export const ProjectList = memo(({ projects, onProjectClick }: ProjectListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000); // Change project every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl bg-transparent dark:bg-transparent">
      <div className="relative h-full w-full cursor-pointer" onClick={() => onProjectClick(projects[currentIndex])}>
        <img
          src={projects[currentIndex].image}
          alt={projects[currentIndex].title}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e39e5]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <div className="bg-[#04070D]/50 p-4 rounded-lg backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-[#fffdf5]">
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
      </div>
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#04070D]/50 hover:bg-[#04070D]/70 p-2 rounded-full transition-transform duration-200 hover:scale-110 active:scale-90"
      >
        <ChevronLeft className="text-white" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#04070D]/50 hover:bg-[#04070D]/70 p-2 rounded-full transition-transform duration-200 hover:scale-110 active:scale-90"
      >
        <ChevronRight className="text-white" />
      </button>
    </div>
  );
});