import React, { useEffect, useRef, useState } from 'react';
import { AnimatedBackground } from './AnimatedBackground';
import './BackgroundView.css'; // Assurez-vous d'importer le fichier CSS

interface BackgroundViewProps {
  onBack: () => void;
}

const BackgroundView: React.FC<BackgroundViewProps> = ({ onBack }) => {
  const [scale, setScale] = useState(2);
  const scaleRef = useRef(scale);
  scaleRef.current = scale;

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      const newScale = Math.max(1, Math.min(2, scaleRef.current - event.deltaY * 0.01));
      setScale(newScale);
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground showHill={true} className="zoom-in" style={{ transform: `scale(${scale})` }} />
      <div className="fixed top-0 z-40 w-full flex justify-end p-4">
        <button
          onClick={onBack}
          className="rounded-full bg-[#1e39e5]/10 p-2 text-[#fffdf5] hover:bg-[#1e39e5]/20"
        >
          Revenir en arrièrefefad
        </button>
      </div>
        <div className="scroll-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16L8 12H16L12 16Z" fill="white"/>
          </svg>
          <p>Scroll to zoom</p>
        </div>
    </div>
  );
};

export default BackgroundView;