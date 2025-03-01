import React, { useState, useEffect, useRef, memo } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ProjectList } from './components/ProjectList';
import { ProjectModal } from './components/ProjectModal';
import { UserProfile } from './components/UserProfile';
import { ProjectGrid } from './components/ProjectGrid';
import BackgroundView from './components/BackgroundView';
import { AnimatedBackground } from './components/AnimatedBackground';
import { projects } from './data/projects';
import { Project } from './types';
import { Github, Linkedin, Mail, Phone, X, ChevronDown, Mouse } from 'lucide-react';
import './App.css'; // Assurez-vous d'importer le fichier CSS

const App = memo(() => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showHill, setShowHill] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [scale, setScale] = useState(2); // Initialiser à 2 pour un zoom par défaut
  const scaleRef = useRef(scale);
  scaleRef.current = scale;

  // Mock user data - in a real app, this would come from your auth system
  const user = {
    name: "Maisonneuve Sam",
    title: "Étudiant en informatique, spécialisé en développement web/app",
    email: "s.maisonneuvepro@gmail.com",
    number: "+33 6 35 38 15 68",
    location: "Perpignan, France",
    Languages: "JavaScript, TypeScript, Python, SQL, HTML, CSS, java, PHP",
    avatar: `${import.meta.env.BASE_URL}avatar.png`,
    linkedin: "https://www.linkedin.com/in/sam-maisonneuve-53b609265/",
    github: "https://github.com/Garwoos",
    twitter: "https://twitter.com/DevSoow",
    resume: `${import.meta.env.BASE_URL}resume.pdf`,
    bio: `Étudiant en informatique de 20 ans, spécialisé en développement web/app | Passionné par la technologie et l’innovation, je suis actuellement en 2ème année de BTS SIO option SLAM (informatique) au lycée Jean lurçat à Perpignan. 
    Originaire de Perpignan, je conçois des applications web qui améliorent le quotidien des utilisateurs. Compétent en React, JavaScript, Node.js, ainsi qu’en bases de données SQL/NoSQL, je maîtrise également Java et Python. J’ai récemment développé un simulateur d’alarme interactif, intégrant des fonctionnalités avancées.
    Je suis convaincu qu’un bon développement repose sur un code propre, efficace et centré sur l’utilisateur. J’aime relever des défis techniques, apprendre de nouvelles technologies et optimiser les performances des applications que je crée. J’ai eu l’occasion de travailler sur plusieurs projets, allant d’applications web interactives à des solutions back-end robustes. Actuellement en recherche d’opportunités (stage, alternance, freelance), je serais ravi d’échanger sur des collaborations potentielles !`,
  };

  useEffect(() => {
    document.title = "Portfolio de Maisonneuve Sam";
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    favicon.href = `${import.meta.env.BASE_URL}avatar.ico`;
  }, []);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (showBackground) {
        event.preventDefault();
        const newScale = Math.max(1, Math.min(2, scaleRef.current - event.deltaY * 0.01));
        setScale(newScale);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [showBackground]);

  const toggleProfile = () => {
    const newShowProfile = !showProfile;
    setShowProfile(newShowProfile);
    setShowHill(newShowProfile); // Active la colline en même temps que le profil
    if (!newShowProfile) {
      setScale(2); // Réinitialiser l'échelle à 2 lorsque le profil est masqué
    }
    else {
      setScale(1); // Réduire l'échelle à 1 lorsque le profil est affiché
    }
  };

  const toggleBackground = () => {
    const newShowBackground = !showBackground;
    setShowBackground(newShowBackground);
    setShowHill(newShowBackground); // Active la colline en même temps que le fond d'écran
    if (!newShowBackground) {
      setScale(2); // Réinitialiser l'échelle à 2 lorsque vous revenez à la page principale
    }
  };

  return (
    <Router>
      <div className="min-h-screen">
        <AnimatedBackground showHill={showHill} className="zoom-in" buildings={buildings} setBuildings={setBuildings} style={{ transform: `scale(${scale})` }} />
        
        {!showBackground && (
          <header className={`fixed top-0 z-40 w-full bg-[#7083A3]/80 backdrop-blur-sm pointer-events-none ${selectedProject ? 'hidden' : ''}`}>
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="text-2xl font-bold text-[#fffdf5] pointer-events-auto">Portfolio</div>
              <nav className="flex items-center gap-6 pointer-events-auto">
                <a href="#projects" className="text-sm font-medium text-[#fffdf5] hover:text-[#1e39e5] select-none">
                  Projects
                </a>
                <a href="#contact" className="text-sm font-medium text-[#fffdf5] hover:text-[#1e39e5] select-none">
                  Contact
                </a>
                <button
                  onClick={toggleProfile}
                  className="rounded-full bg-[#1e39e5]/10 p-2 text-[#fffdf5] hover:bg-[#1e39e5]/20"
                >
                  <img src={user.avatar} alt="User Avatar" className="h-5 w-5 rounded-full" />
                </button>
                <button
                  onClick={toggleBackground}
                  className="rounded-full bg-[#1e39e5]/10 p-2 text-[#fffdf5] hover:bg-[#1e39e5]/20"
                >
                  Voir fond d'écran
                </button>
              </nav>
            </div>
          </header>
        )}

        {showBackground && (
          <div className={`scroll-icon ${scale < 2 ? 'hidden' : ''}`}>
            <Mouse className="h-6 w-6 text-[#fffdf5]" />
            <ChevronDown className="h-6 w-6 text-[#fffdf5]" />
          </div>
        )}

        {showBackground && (
          <button
            onClick={toggleBackground}
            className="fixed top-4 right-4 rounded-full bg-[#1e39e5]/10 p-2 text-[#fffdf5] hover:bg-[#1e39e5]/20 z-50"
          >
            Revenir en arrière
          </button>
        )}

        {!showBackground && (
          <Routes>
            <Route path="/" element={
              !selectedProject ? (
                <>
                  {showProfile ? (
                    <UserProfile user={user} />
                  ) : (
                    <>
                      {/* Hero Section */}
                      <section className="relative pt-8 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 
                        bg-[#0f172a]/80 border border-[#1e39e5] rounded-xl shadow-lg mb-16 mt-20">
                        <h1 className="text-5xl font-extrabold text-[#fffdf5] sm:text-6xl lg:text-7xl select-none leading-tight">
                          {user.name}
                        </h1>
                        <h2 className="text-3xl text-[#fffdf5] sm:text-4xl lg:text-5xl font-semibold mt-2 select-none">
                          Développeur web/app
                        </h2>
                        <p className="mt-6 w-full text-lg text-[#fffdf5] select-none whitespace-pre-line text-justify leading-relaxed">
                          {user.bio}
                        </p>
                      </section>

                      {/* Projects Section */}
                      <section id="projects" className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-[#0f172a]/80 border border-[#1e39e5] rounded-xl shadow-lg mb-16">
                        <h2 className="text-3xl font-bold text-[#fffdf5] select-none">Projets Informatiques</h2>
                        <p className="mt-2 text-[#fffdf5] select-none">
                          Voici quelques projets que j'ai réalisés dans le cadre de mes études et expériences professionnelles.
                        </p>
                        <div className="mt-8">
                          <ProjectList
                            projects={projects}
                            onProjectClick={setSelectedProject}
                          />
                        </div>
                      </section>

                      {/* All Projects Section */}
                      <section id="all-projects" className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-[#0f172a]/80 border border-[#1e39e5] rounded-xl shadow-lg mb-16">
                        <h2 className="text-3xl font-bold text-[#fffdf5] select-none">Tous les Projets</h2>
                        <p className="mt-2 text-[#fffdf5] select-none">
                          Voici une liste de tous les projets que j'ai réalisés.
                        </p>
                        <div className="mt-8">
                          <ProjectGrid
                            projects={projects}
                            onProjectClick={setSelectedProject}
                          />
                        </div>
                      </section>

                      {/* Contact Section */}
                      <section id="contact" className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-[#0f172a]/80 border border-[#1e39e5] rounded-xl shadow-lg mb-16">
                        <h2 className="text-3xl font-bold text-[#fffdf5] select-none">Contact</h2>
                        <p className="mt-2 text-[#fffdf5] select-none">
                          N'hésitez pas à me contacter pour toute opportunité ou collaboration !
                        </p>
                        <div className="mt-8 flex flex-wrap gap-6">
                          {user.github && (
                            <a
                              href={user.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full bg-[#1e39e5]/10 p-3 text-white hover:bg-[#1e39e5]/20"
                            >
                              <Github className="h-6 w-6" />
                            </a>
                          )}
                          {user.linkedin && (
                            <a
                              href={user.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full bg-[#1e39e5]/10 p-3 text-white hover:bg-[#1e39e5]/20"
                            >
                              <Linkedin className="h-6 w-6" />
                            </a>
                          )}
                          {user.twitter && (
                            <a
                              href={user.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full bg-[#1e39e5]/10 p-3 text-white hover:bg-[#1e39e5]/20"
                            >
                              <X className="h-6 w-6" />
                            </a>
                          )}
                          {user.email && (
                            <a
                              href={`mailto:${user.email}`}
                              className="flex items-center gap-2 rounded-full bg-[#1e39e5]/10 p-3 text-white hover:bg-[#1e39e5]/20"
                            >
                              <Mail className="h-6 w-6" />
                              <span>{user.email}</span>
                            </a>
                          )}
                          {user.number && (
                            <a
                              href={`tel:${user.number}`}
                              className="flex items-center gap-2 rounded-full bg-[#1e39e5]/10 p-3 text-white hover:bg-[#1e39e5]/20"
                            >
                              <Phone className="h-6 w-6" />
                              <span>{user.number}</span>
                            </a>
                          )}
                        </div>
                      </section>
                    </>
                  )}
                </>
              ) : (
                <ProjectModal
                  project={selectedProject}
                  isOpen={!!selectedProject}
                  onClose={() => setSelectedProject(null)}
                />
              )
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
});

export default App;