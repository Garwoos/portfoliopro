import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VeilleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VeilleModalComponent = ({ isOpen, onClose }: VeilleModalProps) => {
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
              <button
                onClick={onClose}
                className="absolute right-6 top-6 rounded-full p-2 text-[#1e39e5] hover:bg-[#1e39e5]/20 transition-transform transform hover:scale-110 z-50"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="min-h-screen bg-[#0f172a] text-[#fffdf5] p-8 pt-24 select-none">
                <div className="max-w-7xl mx-auto">
                  <h1 className="text-4xl font-bold mb-8">Veille Technologique</h1>
                  
                  <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4">Développement et Évolution des Données</h2>
                    <p className="leading-relaxed">
                      Le développement et l'évolution des données sont des aspects cruciaux dans le domaine de l'informatique. Avec l'augmentation exponentielle des données générées chaque jour, il est essentiel de mettre en place des stratégies efficaces pour gérer, analyser et utiliser ces données de manière optimale.
                    </p>
                    <p className="mt-4 leading-relaxed">  
                      Les technologies de Big Data et les bases de données NoSQL ont révolutionné la manière dont les données sont stockées et traitées. Elles permettent de gérer des volumes de données massifs et de les analyser en temps réel, offrant ainsi des insights précieux pour les entreprises.
                    </p>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4">Utilisation de l'IA</h2>
                    <p className="leading-relaxed">
                      L'intelligence artificielle (IA) joue un rôle de plus en plus important dans l'analyse et l'exploitation des données. Les algorithmes de machine learning et de deep learning permettent de découvrir des modèles cachés dans les données, de prédire des tendances futures et d'automatiser des tâches complexes.
                    </p>
                    <p className="mt-4 leading-relaxed">
                      L'IA est utilisée dans divers domaines tels que la santé, la finance, le marketing et bien d'autres. Par exemple, dans le domaine de la santé, l'IA peut aider à diagnostiquer des maladies à partir d'images médicales, tandis que dans le marketing, elle peut personnaliser les campagnes publicitaires en fonction des comportements des utilisateurs.
                    </p>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4">Amélioration Continue</h2>
                    <p className="leading-relaxed">
                      L'amélioration continue est essentielle pour rester compétitif dans le monde technologique en constante évolution. Cela implique de surveiller les dernières tendances technologiques, d'adopter de nouvelles technologies et de mettre à jour les systèmes existants pour améliorer leur performance et leur efficacité.
                    </p>
                    <p className="mt-4 leading-relaxed">
                      Les pratiques de DevOps, qui combinent le développement logiciel et les opérations informatiques, jouent un rôle clé dans l'amélioration continue. Elles permettent de déployer des mises à jour plus rapidement et de manière plus fiable, tout en assurant une collaboration étroite entre les équipes de développement et d'exploitation.
                    </p>
                  </section>

                  <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4">Conclusion</h2>
                    <p className="leading-relaxed">
                      En conclusion, le développement et l'évolution des données, l'utilisation de l'IA et l'amélioration continue sont des éléments essentiels pour tirer parti des technologies modernes. En restant à jour avec les dernières tendances et en adoptant des pratiques innovantes, les entreprises peuvent améliorer leur efficacité, offrir de meilleurs services et rester compétitives sur le marché.
                    </p>
                  </section>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const VeilleModal = React.memo(VeilleModalComponent);
export default VeilleModal;
