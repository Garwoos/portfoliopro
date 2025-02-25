import React from 'react';
import { Project } from '../types';

interface ProjectGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function ProjectGrid({ projects, onProjectClick }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project.title}
          className="relative cursor-pointer"
          onClick={() => onProjectClick(project)}
        >
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover rounded-lg"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg" />
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-lg font-bold text-white">{project.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}