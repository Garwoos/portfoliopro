import React, { memo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed';
import '../styles/neon.css';

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    title: string;
    images: string[];
    tweets: string[];
  };
}

const tweetIds = [
  '1898659524862464179',
  '1875383456454341033',
  '1891065782055928206',
  '1890748395549061299',
  // Ajoutez d'autres tweetId ici
];

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
                <h2 className="text-4xl font-bold text-[#1e39e5] neon-text drop-shadow-md">
                  {content.title}
                </h2>
                {/* Display Google Sheets table for "Tableau de synthèse" */}
                {content.title === "Tableau de synthèse" ? (
                  <section className="mt-6">
                    <h3 className="text-2xl font-semibold text-[#1e39e5] border-b pb-2 border-[#1e39e5]/50">
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
                    <h3 className="text-2xl font-semibold text-[#1e39e5] border-b pb-2 border-[#1e39e5]/50">
                      Veille Technologique
                    </h3>
                    <div className="mt-3 space-y-2 text-gray-300">
                      <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">Développement et Évolution des Données</h2>
                        <p className="leading-relaxed">
                          Avec l'augmentation exponentielle des données générées quotidiennement, il est essentiel de mettre en place des stratégies efficaces pour leur gestion et leur analyse. Selon les estimations, le volume annuel de données numériques générées dans le monde pourrait atteindre 181 zettaoctets d'ici 2025. Les technologies de Big Data et les bases de données NoSQL ont transformé le stockage et le traitement des données, permettant de gérer des volumes massifs et d'effectuer des analyses en temps réel, offrant ainsi des insights précieux aux entreprises.
                        </p>
                        <p className="mt-4 leading-relaxed">
                          <em>Source: Statista</em>
                        </p>
                      </section>
                      <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">Utilisation de l'Intelligence Artificielle (IA)</h2>
                        <p className="leading-relaxed">
                          L'IA joue un rôle croissant dans l'exploitation des données. Les algorithmes d'apprentissage automatique et d'apprentissage profond permettent de découvrir des modèles cachés, de prédire des tendances et d'automatiser des tâches complexes. Par exemple, dans le domaine de la santé, l'IA est utilisée pour affiner les diagnostics médicaux et détecter des pathologies, améliorant ainsi la qualité des soins. Dans le secteur du marketing, l'IA personnalise les campagnes publicitaires en fonction des comportements des utilisateurs, augmentant ainsi l'efficacité des stratégies marketing.
                        </p>
                        <p className="mt-4 leading-relaxed">
                          <em>Source: Inserm</em>
                        </p>
                      </section>
                      <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">Rôle des Datacenters pour l'IA</h2>
                        <p className="leading-relaxed">
                          Les datacenters jouent un rôle fondamental dans le développement et l'exécution des modèles d'IA. Avec l'accroissement des besoins en calcul, les infrastructures doivent être optimisées pour offrir des performances accrues tout en réduisant la consommation énergétique. Les technologies telles que les GPU et les TPU permettent d'accélérer l'entraînement des modèles d'apprentissage profond, tandis que l'edge computing réduit la latence en traitant les données plus près de leur source. Des innovations récentes explorent même le stockage de données à l'échelle moléculaire, offrant des solutions plus compactes et durables pour les futurs datacenters.
                        </p>
                      </section>
                      <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">IA et Bases de Données</h2>
                        <p className="leading-relaxed">
                          L'IA est de plus en plus utilisée pour optimiser la gestion des bases de données. Elle améliore la recherche d'informations, automatise l'indexation des données et prédit les requêtes les plus fréquentes afin d'optimiser les performances. Les bases de données intelligentes utilisent l'IA pour détecter des anomalies, renforcer la sécurité et optimiser les processus de sauvegarde et de restauration.
                        </p>
                      </section>
                      <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">Analyse des Fichiers Excel/CSV par l'IA</h2>
                        <p className="leading-relaxed">
                          L'IA facilite l'analyse des fichiers Excel et CSV en automatisant le nettoyage des données, en identifiant les erreurs et en proposant des visualisations pertinentes. Grâce au traitement du langage naturel (NLP), elle peut interpréter les requêtes des utilisateurs et extraire des tendances sans nécessiter de connaissances approfondies en analyse de données. Ces outils sont de plus en plus adoptés dans la finance, le commerce et la gestion de projet pour simplifier la prise de décision.
                        </p>
                      </section>
                      <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">Amélioration Continue</h2>
                        <p className="leading-relaxed">
                          Pour rester compétitives, les entreprises doivent surveiller les tendances technologiques, adopter de nouvelles technologies et mettre à jour leurs systèmes pour améliorer performance et efficacité. Les pratiques de DevOps, combinant développement logiciel et opérations informatiques, jouent un rôle clé en permettant des déploiements plus rapides et fiables, tout en assurant une collaboration étroite entre les équipes.
                        </p>
                      </section>
                      <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">Conclusion</h2>
                        <p className="leading-relaxed">
                          En somme, le développement et l'évolution des données, l'utilisation de l'IA et l'amélioration continue sont essentiels pour tirer parti des technologies modernes. En restant informées des dernières tendances et en adoptant des pratiques innovantes, les entreprises peuvent améliorer leur efficacité, offrir de meilleurs services et maintenir leur compétitivité sur le marché.
                        </p>
                      </section>
                      <section className="mt-6">
                        <h3 className="text-2xl font-semibold text-[#1e39e5] border-b pb-2 border-[#1e39e5]/50">
                          Tweets
                        </h3>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">                        {tweetIds.map((tweetId, index) => (
                          <TwitterTweetEmbed key={index} tweetId={tweetId} />
                        ))}
                        </div>
                      </section>
                    </div>
                  </section>
                ) : content.title === "Stages" ? (
                  <section className="mt-6">
                    <h3 className="text-2xl font-semibold text-[#1e39e5] border-b pb-2 border-[#1e39e5]/50">
                      Rapport de Stage chez Alias Informatique
                    </h3>
                    <div className="mt-3 space-y-2 text-gray-300">
                      <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">Première Partie : Découverte du Secteur Réseau</h2>
                        <p className="leading-relaxed">
                          Durant les deux premières semaines, j'ai rejoint l'équipe réseau d'Alias Informatique. J'ai accompagné les employés sur le terrain, notamment dans des écoles et des entreprises, afin de comprendre le fonctionnement des infrastructures réseaux. Cette immersion m'a permis d'observer :
                        </p>
                        <ul className="list-disc list-inside mt-4 leading-relaxed">
                          <li>L'installation et la maintenance des équipements réseaux.</li>
                          <li>La configuration des serveurs et postes clients.</li>
                          <li>Les procédures de diagnostic et de résolution des problèmes.</li>
                        </ul>
                        <p className="mt-4 leading-relaxed">
                          Cette expérience m'a donné une vision concrète des enjeux du réseau dans un environnement professionnel.
                        </p>
                      </section>
                      <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">Deuxième Partie : Expérience en Développement Informatique</h2>
                        <p className="leading-relaxed">
                          Après cette première immersion, j'ai rejoint le pôle développement de l'entreprise pour tester mes compétences en Windev. Pour évaluer mes capacités, on m'a confié le développement d'une application permettant de recueillir des avis et de réaliser des sondages. Ce projet m'a permis de mettre en pratique mes compétences en :
                        </p>
                        <ul className="list-disc list-inside mt-4 leading-relaxed">
                          <li>Conception d'interface utilisateur avec Windev.</li>
                          <li>Gestion de bases de données.</li>
                          <li>Traitement et affichage des résultats des sondages.</li>
                        </ul>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                          <div className="aspect-video w-full overflow-hidden rounded-lg border border-[#1e39e5] border-opacity-50 shadow-md">
                            <img
                              src={`${import.meta.env.BASE_URL}alias/reponses.png`}
                              alt="Réponses"
                              className="h-full w-full object-contain transition-transform transform hover:scale-105 duration-300"
                              loading="lazy"
                            />
                          </div>
                          <div className="aspect-video w-full overflow-hidden rounded-lg border border-[#1e39e5] border-opacity-50 shadow-md">
                            <img
                              src={`${import.meta.env.BASE_URL}alias/sondage.png`}
                              alt="Sondage"
                              className="h-full w-full object-contain transition-transform transform hover:scale-105 duration-300"
                              loading="lazy"
                            />
                          </div>
                          <div className="aspect-video w-full overflow-hidden rounded-lg border border-[#1e39e5] border-opacity-50 shadow-md">
                            <img
                              src={`${import.meta.env.BASE_URL}alias/sondage2.png`}
                              alt="Sondage 2"
                              className="h-full w-full object-contain transition-transform transform hover:scale-105 duration-300"
                              loading="lazy"
                            />
                          </div>
                          <div className="aspect-video w-full overflow-hidden rounded-lg border border-[#1e39e5] border-opacity-50 shadow-md">
                            <img
                              src={`${import.meta.env.BASE_URL}alias/sondage3.png`}
                              alt="Sondage 3"
                              className="h-full w-full object-contain transition-transform transform hover:scale-105 duration-300"
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <p className="mt-4 leading-relaxed">
                          Une fois ce premier projet réussi, on m'a confié une mission plus complexe.
                        </p>
                      </section>
                      <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">Mission Principale : Développement d'un Afficheur de Tickets</h2>
                        <p className="leading-relaxed">
                          L'objectif était de créer une application permettant d'afficher les tickets en cours ou non terminés. Les principales fonctionnalités que j'ai développées sont :
                        </p>
                        <ul className="list-disc list-inside mt-4 leading-relaxed">
                          <li>Affichage des tickets triés par date de création.</li>
                          <li>Visualisation de la date de dernière modification.</li>
                          <li>Affichage des informations clés : numéro du ticket, client concerné, tâche à réaliser et état d'avancement.</li>
                          <li>Intégration sur deux boîtiers Android distincts : un pour l'équipe de développement et un autre pour l'équipe réseau, avec une gestion des tickets spécifique à chaque pôle.</li>
                        </ul>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                          <div className="aspect-video w-full overflow-hidden rounded-lg border border-[#1e39e5] border-opacity-50 shadow-md">
                            <img
                              src={`${import.meta.env.BASE_URL}alias/afficheur.png`}
                              alt="Afficheur de Tickets"
                              className="h-full w-full object-contain transition-transform transform hover:scale-105 duration-300"
                              loading="lazy"
                            />
                          </div>
                          <div className="aspect-video w-full overflow-hidden rounded-lg border border-[#1e39e5] border-opacity-50 shadow-md">
                            <img
                              src={`${import.meta.env.BASE_URL}alias/menu.png`}
                              alt="menu"
                              className="h-full w-full object-contain transition-transform transform hover:scale-105 duration-300"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </section>
                      <section className="mb-12">
                        <h2 className="text-3xl font-semibold mb-4">Conclusion</h2>
                        <p className="leading-relaxed">
                          Ce stage chez Alias Informatique m'a permis d'acquérir des compétences solides aussi bien en réseau qu'en développement. La combinaison de l'observation sur le terrain et de la mise en pratique m'a offert une expérience enrichissante et formatrice. La réalisation de l'afficheur de tickets a été un challenge stimulant qui m'a permis d'améliorer mes compétences en Windev et de mieux comprendre les besoins fonctionnels d'une entreprise informatique.
                        </p>
                        <p className="mt-4 leading-relaxed">
                          Ce stage a renforcé mon intérêt pour l'informatique et m'a donné envie de poursuivre dans ce domaine, que ce soit en réseau ou en développement.
                        </p>
                      </section>
                    </div>
                  </section>
                ) : (
                  <>
                    {/* Images */}
                    <section className="mt-6">
                      <h3 className="text-2xl font-semibold text-[#1e39e5] border-b pb-2 border-[#1e39e5]/50">
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
                  </>
                )}
              </div>
              <section className="mt-6">
                <h3 className="text-2xl font-semibold text-[#1e39e5] border-b pb-2 border-[#1e39e5]/50">
                  Rapport de Stage chez Star-Alarm
                </h3>
                <div className="mt-3 space-y-2 text-gray-300">
                  <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4">Introduction</h2>
                    <p className="leading-relaxed">
                      Durant mon stage chez Star-Alarm, j’ai travaillé en binôme sur le développement d’une application web sous NodeJS et ReactJS. Ce projet avait pour objectif de proposer un service en ligne permettant de configurer des plans et des systèmes d’alarmes avec un système d’authentification et de parrainage.
                    </p>
                    <p className="mt-4">
                      <img src="path/to/presentation-image.jpg" alt="Présentation de l'application" className="w-full rounded-lg border border-[#1e39e5] border-opacity-50 shadow-md" />
                    </p>
                  </section>
                  <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4">Présentation du Projet</h2>
                    <p className="leading-relaxed">
                      L’application avait pour but de faciliter la configuration et l’installation de systèmes de sécurité en ligne. Grâce à une interface intuitive développée sous ReactJS, les utilisateurs pouvaient concevoir un plan de leur domicile ou entreprise et y intégrer différents types d’alarmes.
                    </p>
                    <ul className="list-disc list-inside mt-4 leading-relaxed">
                      <li>Authentification et gestion des utilisateurs</li>
                      <li>Création et configuration d’un plan interactif</li>
                      <li>Ajout et personnalisation des dispositifs de sécurité</li>
                      <li>Système de parrainage pour recommander le service</li>
                    </ul>
                    <p className="mt-4">
                      <img src="path/to/interface-image.jpg" alt="Interface utilisateur" className="w-full rounded-lg border border-[#1e39e5] border-opacity-50 shadow-md" />
                    </p>
                  </section>
                  <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4">Technologies Utilisées</h2>
                    <p className="leading-relaxed">
                      Pour développer cette application, nous avons utilisé les technologies suivantes :
                    </p>
                    <ul className="list-disc list-inside mt-4 leading-relaxed">
                      <li>ReactJS - Interface utilisateur dynamique</li>
                      <li>NodeJS & ExpressJS - Back-end et gestion des API</li>
                      <li>MySQL & PhpMyAdmin - Base de données</li>
                      <li>TailwindCSS - Design et mise en page responsive</li>
                      <li>JavaScript - Langage principal du projet</li>
                    </ul>
                  </section>
                  <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4">Mon Rôle dans le Projet</h2>
                    <p className="leading-relaxed">
                      J’ai principalement travaillé sur :
                    </p>
                    <ul className="list-disc list-inside mt-4 leading-relaxed">
                      <li>La base de données, conçue avec MySQL et PhpMyAdmin.</li>
                      <li>L’API, développée avec ExpressJS pour gérer la communication entre le front-end et la base de données.</li>
                      <li>Le simulateur, développé en ReactJS et Canvas, utilisant des formules mathématiques pour gérer les angles, vecteurs et interactions des composants graphiques.</li>
                    </ul>
                    <p className="mt-4">
                      <img src="path/to/architecture-image.jpg" alt="Architecture technique" className="w-full rounded-lg border border-[#1e39e5] border-opacity-50 shadow-md" />
                    </p>
                  </section>
                  <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-4">Bilan et Conclusion</h2>
                    <p className="leading-relaxed">
                      Ce stage chez Star-Alarm a été une expérience enrichissante qui m’a permis d’approfondir mes compétences en développement web fullstack. Travailler en binôme sur un projet concret m’a appris l’importance de la collaboration, de la gestion de projet et de l’optimisation du code.
                    </p>
                    <p className="mt-4 leading-relaxed">
                      Grâce à cette expérience, j’ai consolidé mes connaissances en ReactJS et NodeJS, et je me sens plus à l’aise avec les bases de données et la gestion d’API.
                    </p>
                  </section>
                </div>
              </section>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const EvaluationModal = memo(EvaluationModalComponent);
