import React, { memo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import '../styles/neon.css';

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    title: string;
    description: string;
    images: string[];
    tweets: string[];
  };
}

const EvaluationModalComponent = ({ isOpen, onClose, content }: EvaluationModalProps) => {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [cachedTweets, setCachedTweets] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsImageOpen(false);
      setImageLoaded(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isImageOpen && imageRef.current) {
      imageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isImageOpen]);

  useEffect(() => {
    if (isOpen && !cachedTweets) {
      fetchTweets();
    }
  }, [isOpen, cachedTweets]);

  const fetchTweets = async () => {
    try {
      const response = await fetch('https://api.twitter.com/2/tweets?ids=YOUR_TWEET_IDS', {
        headers: {
          'Authorization': `Bearer YOUR_BEARER_TOKEN`
        }
      });
      const data = await response.json();
      setCachedTweets(JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

  const handleMouseEnter = () => {
    document.body.style.overflow = 'hidden';
    if (modalRef.current) {
      modalRef.current.style.overflow = 'hidden';
    }
  };

  const handleMouseLeave = () => {
    document.body.style.overflow = 'auto';
    if (modalRef.current) {
      modalRef.current.style.overflow = 'auto';
    }
  };

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
              ref={modalRef}
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
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-6 top-6 rounded-full p-2 text-[#1e39e5] hover:bg-[#1e39e5]/20 transition-transform transform hover:scale-110 z-50"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Modal content */}
              <div className="mt-6">
                <h2 className="text-4xl font-bold text-[#FFFFC8] neon-text drop-shadow-md">
                  {content.title}
                </h2>
                <p className="mt-4 text-gray-300 leading-relaxed">{content.description}</p>

                {/* Display Google Sheets table for "Tableau de synthèse" */}
                {content.title === "Tableau de synthèse" ? (
                  <section className="mt-6">
                    <h3 className="text-2xl font-semibold text-[#FFFFC8] border-b pb-2 border-[#FFFFC8]/50">
                      Tableau de synthèse
                    </h3>
                    <div className="mt-3 space-y-2 text-gray-300">
                      <iframe
                        src="https://docs.google.com/spreadsheets/d/1btbiof_5G4-wgWc_huY5KhI5vwDMEH-qNF96PStUvaI/edit?gid=0#gid=0"
                        width="100%"
                        height="600"
                        frameBorder="0"
                        className="w-full rounded-lg border border-[#1e39e5] border-opacity-50 shadow-md"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      ></iframe>
                    </div>
                  </section>
                ) : content.title === "Veille Technologique" ? (
                  <section className="mt-6">
                    <h3 className="text-2xl font-semibold text-[#FFFFC8] border-b pb-2 border-[#FFFFC8]/50">
                      Veille Technologique
                    </h3>
                    <div className="mt-3 space-y-2 text-gray-300">
                      <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4 text-[#FFFFC8]">Développement et Évolution des Données</h2>
                        <p className="leading-relaxed">
                          Le développement et l'évolution des données sont des aspects cruciaux dans le domaine de l'informatique. Avec l'augmentation exponentielle des données générées chaque jour, il est essentiel de mettre en place des stratégies efficaces pour gérer, analyser et utiliser ces données de manière optimale.
                        </p>
                        <p className="mt-4 leading-relaxed">  
                          Les technologies de Big Data et les bases de données NoSQL ont révolutionné la manière dont les données sont stockées et traitées. Elles permettent de gérer des volumes de données massifs et de les analyser en temps réel, offrant ainsi des insights précieux pour les entreprises.
                        </p>
                      </section>
                      <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4 text-[#FFFFC8]">Utilisation de l'IA</h2>
                        <p className="leading-relaxed">
                          L'intelligence artificielle (IA) joue un rôle de plus en plus important dans l'analyse et l'exploitation des données. Les algorithmes de machine learning et de deep learning permettent de découvrir des modèles cachés dans les données, de prédire des tendances futures et d'automatiser des tâches complexes.
                        </p>
                        <p className="mt-4 leading-relaxed">
                          L'IA est utilisée dans divers domaines tels que la santé, la finance, le marketing et bien d'autres. Par exemple, dans le domaine de la santé, l'IA peut aider à diagnostiquer des maladies à partir d'images médicales, tandis que dans le marketing, elle peut personnaliser les campagnes publicitaires en fonction des comportements des utilisateurs.
                        </p>
                      </section>
                      <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4 text-[#FFFFC8]">Amélioration Continue</h2>
                        <p className="leading-relaxed">
                          L'amélioration continue est essentielle pour rester compétitif dans le monde technologique en constante évolution. Cela implique de surveiller les dernières tendances technologiques, d'adopter de nouvelles technologies et de mettre à jour les systèmes existants pour améliorer leur performance et leur efficacité.
                        </p>
                        <p className="mt-4 leading-relaxed">
                          Les pratiques de DevOps, qui combinent le développement logiciel et les opérations informatiques, jouent un rôle clé dans l'amélioration continue. Elles permettent de déployer des mises à jour plus rapidement et de manière plus fiable, tout en assurant une collaboration étroite entre les équipes de développement et d'exploitation.
                        </p>
                      </section>
                      <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4 text-[#FFFFC8]">Conclusion</h2>
                        <p className="leading-relaxed">
                          En conclusion, le développement et l'évolution des données, l'utilisation de l'IA et l'amélioration continue sont des éléments essentiels pour tirer parti des technologies modernes. En restant à jour avec les dernières tendances et en adoptant des pratiques innovantes, les entreprises peuvent améliorer leur efficacité, offrir de meilleurs services et rester compétitives sur le marché.
                        </p>
                      </section>
                      <section className="mt-6">
                        <h3 className="text-2xl font-semibold text-[#FFFFC8] border-b pb-2 border-[#FFFFC8]/50">
                          Tweets
                        </h3>
                        <div className="mt-3 space-y-2 text-gray-300">
                          {cachedTweets ? (
                            <TwitterTimelineEmbed
                              sourceType="profile"
                              screenName="DevSoow"
                              options={{ height: 400 }}
                              noHeader
                              noFooter
                              noBorders
                              showRetweets
                            />
                          ) : (
                            <p>Loading tweets...</p>
                          )}
                        </div>
                      </section>
                    </div>
                  </section>
                ) : (
                  <>
                    {/* Images */}
                    <section className="mt-6">
                      <h3 className="text-2xl font-semibold text-[#FFFFC8] border-b pb-2 border-[#FFFFC8]/50">
                        Images
                      </h3>
                      <div className="mt-3 space-y-2 text-gray-300">
                        {content.images.map((image, index) => (
                          <div key={index} className="aspect-video w-full overflow-hidden rounded-lg border border-[#1e39e5] border-opacity-50 shadow-md">
                            <img
                              src={image}
                              alt={`Evaluation Image ${index + 1}`}
                              className="h-full w-full object-cover transition-transform transform hover:scale-105 duration-300"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Tweets */}
                    <section className="mt-6">
                      <h3 className="text-2xl font-semibold text-[#FFFFC8] border-b pb-2 border-[#FFFFC8]/50">
                        Tweets
                      </h3>
                      <div className="mt-3 space-y-2 text-gray-300">
                        {cachedTweets ? (
                          <TwitterTimelineEmbed
                            sourceType="profile"
                            screenName="DevSoow"
                            options={{ height: 400 }}
                            noHeader
                            noFooter
                            noBorders
                            showRetweets
                          />
                        ) : (
                          <p>Loading tweets...</p>
                        )}
                      </div>
                    </section>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const EvaluationModal = memo(EvaluationModalComponent);
