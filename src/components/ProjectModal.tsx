import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#04070D]/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 top-16 rounded-t-3xl bg-[#7083A3] p-6 shadow-xl dark:bg-[#04070D] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 rounded-full p-2 text-[#1e39e5] hover:bg-[#1e39e5]/20 dark:text-[#1e39e5] dark:hover:bg-[#1e39e5]/20"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mx-auto max-w-4xl">
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-6">
                <h2 className="text-3xl font-bold text-[#04070D] dark:text-[#1e39e5]">{project.title}</h2>
                <p className="mt-2 text-[#04070D] dark:text-[#1e39e5]">
                  {project.description}
                </p>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-[#04070D] dark:text-[#1e39e5]">Challenge</h3>
                  <p className="mt-2 text-[#04070D] dark:text-[#1e39e5]">
                    {project.challenge}
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-[#04070D] dark:text-[#1e39e5]">Solution</h3>
                  <p className="mt-2 text-[#04070D] dark:text-[#1e39e5]">
                    {project.solution}
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-[#04070D] dark:text-[#1e39e5]">Tech Stack</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-[#1e39e5]/10 px-3 py-1 text-sm text-[#1e39e5] dark:bg-[#1e39e5]/20 dark:text-[#1e39e5]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-[#1e39e5] px-4 py-2 text-[#7083A3] hover:bg-[#1e39e5]/20 dark:bg-[#1e39e5] dark:hover:bg-[#1e39e5]/20"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-[#1e39e5]/20 px-4 py-2 text-[#1e39e5] hover:bg-[#1e39e5]/20 dark:border-[#1e39e5]/20 dark:text-[#1e39e5] dark:hover:bg-[#1e39e5]/20"
                    >
                      View on GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}