import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Project } from '../types';
import '../styles/neon.css';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModalComponent = ({ project, isOpen, onClose }: ProjectModalProps) => {
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
            className="fixed inset-x-0 bottom-0 top-16 rounded-t-3xl bg-[#0a0f1a]/80 p-6 shadow-xl backdrop-blur-md overflow-y-auto border border-[#1e39e5] border-opacity-50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 rounded-full p-2 text-[#1e39e5] hover:bg-[#1e39e5]/20"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mx-auto max-w-4xl">
              <div className="aspect-video w-full overflow-hidden rounded-lg border border-[#1e39e5] border-opacity-50">
                <img
                  src={project.image}
                  alt={project.titre}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-6">
                <h2 className="text-3xl font-bold text-[#1e39e5] neon-text">{project.titre}</h2>
                <p className="mt-2 text-white">{project.description}</p>
                <p className="mt-2 text-white"><strong>Défi:</strong> {project.défi}</p>
                <p className="mt-2 text-white"><strong>Solution:</strong> {project.solution}</p>
                
                <p className="mt-4 text-white"><strong>Objectif:</strong> {project.objectif}</p>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-[#1e39e5]">Fonctionnalités :</h3>
                  <ul className="list-disc list-inside text-white">
                    {project.fonctionnalités.gestion_evenements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                    {project.fonctionnalités.notifications.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                    {project.fonctionnalités.historique.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                    {project.fonctionnalités.gestion_participants.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                    {project.fonctionnalités.accessibilite.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-[#1e39e5]">Évolution future :</h3>
                  <ul className="list-disc list-inside text-white">
                    {project.evolution_future.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <p className="mt-4 text-white"><strong>Conclusion:</strong> {project.conclusion}</p>

                <p className="mt-4 text-white"><strong>Technologies:</strong> {project.technologies.join(', ')}</p>

                <div className="mt-6 flex gap-4">
                  <a href={project.urlDemo} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#1e39e5] px-4 py-2 text-white hover:bg-[#1e39e5]/80">
                    Voir Demo
                  </a>
                  <a href={project.urlGithub} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#1e39e5] px-4 py-2 text-white hover:bg-[#1e39e5]/80">
                    Voir Code
                  </a>
                  <button
                    onClick={onClose}
                    className="rounded-lg bg-[#1e39e5] px-4 py-2 text-white hover:bg-[#1e39e5]/80"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ProjectModal = memo(ProjectModalComponent);
