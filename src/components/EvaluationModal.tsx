import React, { memo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
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
  const [tweets, setTweets] = useState<string[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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
    if (isOpen) {
      fetchTweets();
    }
  }, [isOpen]);

  const fetchTweets = async () => {
    // Replace with your logic to fetch tweets
    const fetchedTweets = content.tweets;
    setTweets(fetchedTweets);
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
                <p className="mt-4 text-gray-300 leading-relaxed">{content.description}</p>

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

                    {/* Tweets */}
                    <section className="mt-6">
                      <h3 className="text-2xl font-semibold text-[#1e39e5] border-b pb-2 border-[#1e39e5]/50">
                        Tweets
                      </h3>
                      <div className="mt-3 space-y-2 text-gray-300">
                        {tweets.map((tweet, index) => (
                          <div key={index} className="aspect-video w-full overflow-hidden rounded-lg border border-[#1e39e5] border-opacity-50 shadow-md">
                            <blockquote className="twitter-tweet">
                              <a href={tweet}></a>
                            </blockquote>
                          </div>
                        ))}
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
