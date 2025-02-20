import React, { memo, useState, useEffect, useRef } from 'react';
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
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsVideoOpen(false);
      setVideoLoaded(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isVideoOpen && videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isVideoOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 overflow-y-auto"
          onClick={onClose}
          style={{ willChange: "opacity" }}
        >
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              layout
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 180 }}
              className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto scroll-smooth rounded-xl p-6 shadow-lg bg-[#0a0f1a]/90 border border-[#1e39e5] border-opacity-50"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: "0 0 15px rgba(30, 57, 229, 0.4)",
                background: "linear-gradient(to bottom, rgba(10, 15, 26, 0.95), rgba(10, 15, 26, 0.85))",
                willChange: "transform, opacity",
              }}
            >
              {/* Bouton de fermeture */}
              <button
                onClick={onClose}
                className="absolute right-6 top-6 rounded-full p-2 text-[#1e39e5] hover:bg-[#1e39e5]/20 transition-transform transform hover:scale-110 z-50"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Image du projet */}
              <div className="aspect-video w-full overflow-hidden rounded-lg border border-[#1e39e5] border-opacity-50 shadow-md">
                <img
                  src={project.image}
                  alt={project.titre}
                  className="h-full w-full object-cover transition-transform transform hover:scale-105 duration-300"
                  loading="lazy"
                />
              </div>

              {/* Contenu du modal */}
              <div className="mt-6">
                <h2 className="text-4xl font-bold text-[#1e39e5] neon-text drop-shadow-md">
                  {project.titre}
                </h2>
                <p className="mt-4 text-gray-300 leading-relaxed">{project.description}</p>

                {/* Sections dynamiques */}
                {["Défi", "Solution", "Objectif"].map((key) => (
                  <p key={key} className="mt-2 text-gray-300">
                    <strong className="text-[#1e39e5]">{key}:</strong> {project[key.toLowerCase()]}
                  </p>
                ))}

                {/* Fonctionnalités */}
                <section className="mt-6">
                  <h3 className="text-2xl font-semibold text-[#1e39e5] border-b pb-2 border-[#1e39e5]/50">
                    Fonctionnalités 🔥
                  </h3>
                  <ul className="mt-3 space-y-2 text-gray-300">
                    {Object.entries(project.fonctionnalités).map(([key, value]) => (
                      <li key={key}>
                        <h4 className="text-lg font-semibold text-[#1e39e5] mt-2">{key} :</h4>
                        {value.map((item: string, index: number) => (
                          <p key={index} className="flex items-center gap-2">
                            🔹 {item}
                          </p>
                        ))}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Technologies */}
                <p className="mt-6 text-lg text-gray-300">
                  <strong className="text-[#1e39e5]">Technologies:</strong> {project.technologies.join(', ')}
                </p>

                {/* Boutons d'actions */}
                <div className="mt-6 flex flex-wrap gap-4">
                  {project.urlGithub && (
                    <a
                      href={project.urlGithub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-[#1e39e5] px-5 py-2 text-white transition-transform transform hover:scale-105 hover:bg-[#1e39e5]/80"
                    >
                      🔗 Voir Code
                    </a>
                  )}
                  {project.urlDemo && (
                    <button
                      onClick={() => { setIsVideoOpen(true); setVideoLoaded(true); }}
                      className="rounded-lg bg-[#1e39e5] px-5 py-2 text-white transition-transform transform hover:scale-105 hover:bg-[#1e39e5]/80"
                    >
                      🎬 Voir Explication
                    </button>
                  )}
                </div>

                {/* Vidéo d'explication */}
                {isVideoOpen && (
                  <div className="mt-6" ref={videoRef}>
                    <video
                      src={project.urlDemo}
                      controls
                      autoPlay
                      className="w-full rounded-lg border border-[#1e39e5] border-opacity-50 shadow-md"
                      onLoadedData={() => setVideoLoaded(true)}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ProjectModal = memo(ProjectModalComponent);