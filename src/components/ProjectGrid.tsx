import React, { memo } from 'react';
import { Project } from '../types';

interface ProjectGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export const ProjectGrid = memo(({ projects, onProjectClick }: ProjectGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project.id} // Utilisez une clé unique ici
          className="relative cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:rotate-1 active:scale-95"
          onClick={() => onProjectClick(project)}
        >
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover rounded-lg transition-opacity duration-300 hover:opacity-90"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg transition-opacity duration-300 hover:opacity-80" />
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-lg font-bold text-white">{project.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
});