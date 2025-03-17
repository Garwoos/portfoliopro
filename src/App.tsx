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
import { Github, Linkedin, Mail, ChevronDown, Mouse, FileText, Table2, BookText, Briefcase } from 'lucide-react';
import { DiJavascript1, DiPython, DiHtml5, DiCss3, DiJava, DiPhp, DiMysql, DiVisualstudio, DiReact, DiNodejs } from 'react-icons/di';
import { SiSpring, SiTypescript } from 'react-icons/si';
import { FaLaptopCode, FaXTwitter } from "react-icons/fa6"
import { FaServer } from "react-icons/fa";
import './App.css'; // Assurez-vous d'importer le fichier CSS
import { EvaluationModal } from './components/EvaluationModal';

const App = memo(() => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showHill, setShowHill] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [scale, setScale] = useState(2); // Initialiser à 2 pour un zoom par défaut
  const scaleRef = useRef(scale);
  scaleRef.current = scale;
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [evaluationContent, setEvaluationContent] = useState({
    title: "",
    description: "",
    images: [],
    tweets: []
  });

  const evaluationData = {
    "Veille Technologique": {
      title: "Veille Technologique",
      description: "Description for Veille Technologique.",
      images: [
        `${import.meta.env.BASE_URL}veille1.png`,
        `${import.meta.env.BASE_URL}veille2.png`
      ],
      tweets: [
      ]
    },
    "Tableau de synthèse": {
      title: "Tableau de synthèse",
      description: "Description for Tableau de synthèse.",
      images: [
        `${import.meta.env.BASE_URL}synthese1.png`,
        `${import.meta.env.BASE_URL}synthese2.png`
      ],
      tweets: [
      ]
    },
    "Stages": {
      title: "Stages",
      description: "Description for Stages.",
      images: [
        `${import.meta.env.BASE_URL}stages1.png`,
        `${import.meta.env.BASE_URL}stages2.png`
      ],
      tweets: [
      ]
    }
  };

  const openEvaluationModal = (key: string) => {
    setEvaluationContent(evaluationData[key]);
    setShowEvaluationModal(true);
  };

  // Mock user data - in a real app, this would come from your auth system
  const user = {
    name: "Maisonneuve Sam",
    title: "Étudiant en informatique, spécialisé en développement web/app",
    email: "s.maisonneuvepro@gmail.com",
    number: "+33 6 35 38 15 68",
    location: "Perpignan, France",
    Languages: "JavaScript{#f7df1e}, TypeScript{#3178c6}, Python{#306998}, SQL{#e38c00}, HTML{#e34f26}, CSS{#1572b6}, Java{#b07219}, PHP{#777bb4}",
    Technologies: "Visual Studio Code{Logiciel}{#007ACC}, Github{Logiciel}, React{FrameWork}{#61DAFB}, Node.js{FrameWork}{#339933}, Spring Boot{FrameWork}{#6DB33F}, Windev{Logiciel}{#FF0000}, Express{FrameWork}{#807e7e}",
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

  const parseLanguages = (languages: string) => {
    return languages.split(', ').map((lang) => {
      const [name, color] = lang.split('{');
      return {
        name: name.trim().toLowerCase(),
        color: color ? color.replace('}', '').trim() : '#fffdf5',
      };
    });
  };

  const languageIcons: { [key: string]: JSX.Element } = {
    javascript: <DiJavascript1 className="icon" />,
    typescript: <SiTypescript className="icon" />,
    python: <DiPython className="icon" />,
    sql: <DiMysql className="icon" />,
    html: <DiHtml5 className="icon" />,
    css: <DiCss3 className="icon" />,
    java: <DiJava className="icon" />,
    php: <DiPhp className="icon" />,
  };

  const technologiesIcons: { [key: string]: JSX.Element } = {
    'Visual Studio Code': <DiVisualstudio className="icon" />, // Replace with appropriate icon
    Github: <Github className="icon" />,
    React: <DiReact className="icon" />, // Replace with appropriate icon
    'Node.js': <DiNodejs className="icon" />, // Replace with appropriate icon
    'Spring Boot': <SiSpring className="icon" />, // Replace with appropriate icon
    Windev: <FaLaptopCode className="icon" />, // Replace with appropriate icon
    Express: <FaServer className="icon" />
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
                        <h1 className="text-5xl font-extrabold text-[#FFFFC8] sm:text-6xl lg:text-7xl select-none leading-tight">
                          {user.name}
                        </h1>
                        <h2 className="text-3xl text-[#FFFFC8] sm:text-4xl lg:text-5xl font-semibold mt-2 select-none">
                          Développeur web/app
                        </h2>
                        <p className="mt-6 w-full text-lg text-[#fffdf5] select-none whitespace-pre-line text-justify leading-relaxed">
                          {user.bio}
                        </p>
                      </section>

                      {/* Projects Section */}
                      <section id="projects" className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-[#0f172a]/80 border border-[#1e39e5] rounded-xl shadow-lg mb-16">
                        <h2 className="text-3xl font-bold text-[#FFFFC8] select-none">Projets Informatiques</h2>
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
                        <h2 className="text-3xl font-bold text-[#FFFFC8] select-none">Tous les Projets</h2>
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
                        
                      {/* Evaluation Section */}
                      <section id="evalutation" className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-[#0f172a]/80 border border-[#1e39e5] rounded-xl shadow-lg mb-16">
                        <h2 className="text-3xl font-bold text-[#FFFFC8] select-none">Veille Technologique, tableau de synthèse et stages</h2>
                        <p className="mt-2 text-[#fffdf5] select-none">
                          Epreuve E5
                        </p>
                        <div className="mt-8">
                          <ul className="grid grid-cols-4 gap-4 text-center">
                            <li className="flex flex-col items-center justify-center">
                              <button
                                onClick={() => openEvaluationModal("Veille Technologique")}
                                className="flex flex-col items-center justify-center"
                              >
                                <BookText className="h-20 w-20 text-[#fffdf5] transition-transform duration-300 transform hover:scale-110 hover:rotate-3" />
                                <div className="text-[#fffdf5] text-center mt-2">
                                  Veille Technologique
                                </div>
                              </button>
                            </li>
                            <li className="flex flex-col items-center justify-center">
                              <button
                                onClick={() => openEvaluationModal("Tableau de synthèse")}
                                className="flex flex-col items-center justify-center"
                              >
                                <Table2 className="h-20 w-20 text-[#fffdf5] transition-transform duration-300 transform hover:scale-110 hover:rotate-3" />
                                <div className="text-[#fffdf5] text-center mt-2">
                                  Tableau de synthèse
                                </div>
                              </button>
                            </li>
                            <li className="flex flex-col items-center justify-center">
                                <button
                                onClick={() => openEvaluationModal("Stages")}
                                className="flex flex-col items-center justify-center"
                                >
                                <Briefcase className="h-20 w-20 text-[#fffdf5] transition-transform duration-300 transform hover:scale-110 hover:rotate-3" />
                                <div className="text-[#fffdf5] center mt-2">
                                  Stages
                                </div>
                                </button>
                            </li>
                          </ul>
                        </div>
                      </section>

                      {/* All languages Section */}
                      <section id="all-languages" className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-[#0f172a]/80 border border-[#1e39e5] rounded-xl shadow-lg mb-16">
                        <h2 className="text-3xl font-bold text-[#FFFFC8] select-none">Langages de programmation</h2>
                        <p className="mt-2 text-[#fffdf5] select-none">
                          Voici une liste des langages de programmation que je maîtrise.
                        </p>
                        <div className="mt-8">
                          <ul className="grid grid-cols-4 gap-4 text-center">
                            {parseLanguages(user.Languages).map(({ name, color }) => (
                                <li key={name} className="flex flex-col items-center justify-center">
                                <div style={{ color }}>
                                  {React.cloneElement(languageIcons[name], { className: "h-20 w-20 transition-transform duration-300 transform hover:scale-110 hover:rotate-3" })}
                                </div>
                                <div className="text-[#fffdf5] text-center mt-2">
                                  {name.charAt(0).toUpperCase() + name.slice(1)}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </section>

                      {/* All Technologies used Section */}
                        <section id="all-technologies" className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-[#0f172a]/80 border border-[#1e39e5] rounded-xl shadow-lg mb-16">
                        <h2 className="text-3xl font-bold text-[#fffdf5] select-none">Technologies Utilisées</h2>
                        <p className="mt-2 text-[#fffdf5] select-none">
                        Voici une liste des technologies que j'ai utilisées pour mes projets.
                        </p>
                        <div className="mt-8">
                        <h3 className="text-2xl font-semibold text-[#FFFFC8] select-none">Frameworks</h3>
                        <ul className="grid grid-cols-4 gap-4 text-center mt-4">
                        {Object.entries(technologiesIcons).filter(([name]) => user.Technologies.includes(`${name}{FrameWork}`)).map(([name, icon]) => {
                          const color = user.Technologies.split(', ').find(tech => tech.includes(name))?.split('{')[2]?.replace('}', '').trim() || '#fffdf5';
                          return (
                          <li key={name} className="flex flex-col items-center justify-center">
                            <div style={{ color }}>
                            {React.cloneElement(icon, { className: "h-20 w-20 transition-transform duration-300 transform hover:scale-110 hover:rotate-3" })}
                            </div>
                            <div className="text-[#fffdf5] text-center mt-2">
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                            </div>
                          </li>
                          );
                        })}
                        </ul>
                        <h3 className="text-2xl font-semibold text-[#FFFFC8] select-none mt-8">Logiciels</h3>
                        <ul className="grid grid-cols-4 gap-4 text-center mt-4">
                        {Object.entries(technologiesIcons).filter(([name]) => user.Technologies.includes(`${name}{Logiciel}`)).map(([name, icon]) => {
                          const color = user.Technologies.split(', ').find(tech => tech.includes(name))?.split('{')[2]?.replace('}', '').trim() || '#fffdf5';
                          return (
                          <li key={name} className="flex flex-col items-center justify-center">
                            <div style={{ color }}>
                            {React.cloneElement(icon, { className: "h-20 w-20 transition-transform duration-300 transform hover:scale-110 hover:rotate-3" })}
                            </div>
                            <div className="text-[#fffdf5] text-center mt-2">
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                            </div>
                          </li>
                          );
                        })}
                        </ul>
                        </div>
                      </section>


                      {/* Contact Section */}
                      <section id="contact" className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-[#0f172a]/80 border border-[#1e39e5] rounded-xl shadow-lg mb-16">
                        <h2 className="text-3xl font-bold text-[#FFFFC8] select-none">Contact</h2>
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
                              <FaXTwitter className="h-6 w-6" />
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
                          {user.resume && (
                            <a
                            href={`${import.meta.env.BASE_URL}resume.pdf`}
                            className="flex items-center gap-2 rounded-full bg-[#1e39e5]/10 p-3 text-white hover:bg-[#1e39e5]/20"
                          >
                            <a href={user.resume} target="_blank" rel="noopener noreferrer" className="text-[#FF0010]">
                              <FileText className="h-6 w-6" />
                            </a>
                            <span>{user.email}</span>
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
        <EvaluationModal
          isOpen={showEvaluationModal}
          onClose={() => setShowEvaluationModal(false)}
          content={evaluationContent}
        />
      </div>
    </Router>
  );
});

export default App;