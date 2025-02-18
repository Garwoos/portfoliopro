import React, { useState, useEffect } from 'react';
import { ProjectCarousel } from './components/ProjectCarousel';
import { ProjectModal } from './components/ProjectModal';
import { UserProfile } from './components/UserProfile';
import { AnimatedBackground } from './components/AnimatedBackground';
import { projects } from './data/projects';
import { Project } from './types';
import { Github, Linkedin, Mail } from 'lucide-react';

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showHill, setShowHill] = useState(false);

  // Mock user data - in a real app, this would come from your auth system
  const user = {
    name: "Sam Maisonneuve",
    title: "Étudiant en informatique, spécialisé en développement web/app",
    email: "s.maisonneuvepro@gmail.com",
    location: "Perpignan, France",
    Languages: "JavaScript, TypeScript, Python, SQL, HTML, CSS, java, PHP",
    avatar: `${import.meta.env.BASE_URL}avatar.png`,
    linkedin: "https://www.linkedin.com/in/sam-maisonneuve-53b609265/",
    github: "https://github.com/Garwoos",
    resume: `${import.meta.env.BASE_URL}resume.pdf`,
    bio: "Passionné par la technologie et l'innovation, j'aime créer des applications web qui ont un impact positif sur les gens. Je suis actuellement à la recherche d'opportunités développement web/app.",
  };

  useEffect(() => {
    document.title = "Portfolio de Sam Maisonneuve";
  }, []);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowHill(!showProfile); // Active la colline en même temps que le profil
  };

  return (
    <div className="min-h-screen bg-[#409cff]/10">
      <AnimatedBackground showHill={showHill} density={15} />
      
      {/* Header */}
      <header className={`fixed top-0 z-40 w-full bg-[#7083A3]/80 backdrop-blur-sm pointer-events-none ${selectedProject ? 'hidden' : ''}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="text-2xl font-bold text-[#fffdf5] pointer-events-auto">Portfolio</div>
          <nav className="flex items-center gap-6 pointer-events-auto">
            <a href="#projects" className="text-sm font-medium text-[#fffdf5] hover:text-[#1e39e5]">
              Projects
            </a>
            <a href="#contact" className="text-sm font-medium text-[#fffdf5] hover:text-[#1e39e5]">
              Contact
            </a>
            <button
              onClick={toggleProfile}
              className="rounded-full bg-[#1e39e5]/10 p-2 text-[#fffdf5] hover:bg-[#1e39e5]/20"
            >
              <img src={user.avatar} alt="User Avatar" className="h-5 w-5 rounded-full" />
            </button>
          </nav>
        </div>
      </header>

      {!selectedProject && (
        <>
          {showProfile ? (
            <UserProfile user={user} />
          ) : (
            <>
              {/* Hero Section */}
              <section className="relative pt-16 pointer-events-none">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 pointer-events-auto">
                  <h1 className="text-4xl font-bold text-[#fffdf5] sm:text-5xl lg:text-6xl">
                    Trucs
                    <br />
                    Ouai
                  </h1>
                  <p className="mt-6 max-w-xl text-lg text-[#fffdf5]">
                    on est la
                  </p>
                </div>
              </section>

              {/* Projects Section */}
              <section id="projects" className="py-20 pointer-events-none">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pointer-events-auto">
                  <h2 className="text-3xl font-bold text-[#fffdf5]">Projets de cons</h2>
                  <p className="mt-2 text-[#fffdf5]">
                    Truc random
                  </p>
                  <div className="mt-8">
                    <ProjectCarousel
                      projects={projects}
                      onProjectClick={setSelectedProject}
                    />
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="py-20 pointer-events-none">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pointer-events-auto">
                  <h2 className="text-3xl font-bold text-[#fffdf5]">Fornite </h2>
                  <p className="mt-2 text-[#fffdf5]">
                    Battle pass
                  </p>
                  <div className="mt-8 flex gap-6">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-[#1e39e5]/10 p-3 text-[#04070D] hover:bg-[#1e39e5]/20"
                    >
                      <Github className="h-6 w-6" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-[#1e39e5]/10 p-3 text-[#04070D] hover:bg-[#1e39e5]/20"
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                    <a
                      href="mailto:s.maisonneuvepro@gmail.com"
                      className="rounded-full bg-[#1e39e5]/10 p-3 text-[#04070D] hover:bg-[#1e39e5]/20"
                    >
                      <Mail className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;