
import React, { useState, useRef, useEffect } from 'react';
import { NO_BUTTON_TEXTS } from './constants';
import Heart from './components/Heart';

const App: React.FC = () => {
  const [yesClicked, setYesClicked] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const noButtonRef = useRef<HTMLButtonElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);
  const noSoundRef = useRef<HTMLAudioElement>(null);
  const yesSoundRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    musicRef.current = document.getElementById('background-music') as HTMLAudioElement;
    noSoundRef.current = document.getElementById('no-sound') as HTMLAudioElement;
    yesSoundRef.current = document.getElementById('yes-sound') as HTMLAudioElement;
  }, []);

  const handleYesClick = () => {
    setYesClicked(true);
    if (yesSoundRef.current) {
        yesSoundRef.current.play();
    }
    if (musicRef.current) {
        musicRef.current.volume = 0.5; // Lower music volume for celebration
    }
  };

  const handleNoMouseOver = () => {
    if (noButtonRef.current) {
      const newNoCount = noCount + 1;
      setNoCount(newNoCount);
      setYesButtonSize(prev => prev + 0.2);

      const button = noButtonRef.current;
      const appContainer = button.parentElement?.parentElement as HTMLElement;
      const maxLeft = appContainer.clientWidth - button.clientWidth;
      const maxTop = appContainer.clientHeight - button.clientHeight;

      const randomLeft = Math.floor(Math.random() * maxLeft);
      const randomTop = Math.floor(Math.random() * maxTop);

      button.style.left = `${randomLeft}px`;
      button.style.top = `${randomTop}px`;

      if (noSoundRef.current) {
        noSoundRef.current.currentTime = 0;
        noSoundRef.current.play();
      }

      if (!isMusicPlaying && musicRef.current) {
        musicRef.current.play().then(() => setIsMusicPlaying(true)).catch(console.error);
      }
    }
  };

  const getNoButtonText = () => {
    return NO_BUTTON_TEXTS[noCount % NO_BUTTON_TEXTS.length];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-pink-200 via-red-200 to-rose-300 p-4 overflow-hidden">
      {yesClicked ? (
        <div className="text-center">
          <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt="Bears kissing" className="mx-auto rounded-lg shadow-lg" />
          <h1 className="text-4xl md:text-6xl text-white mt-8 shadow-text">
            YAY! I love you too! 🥰
          </h1>
          {Array.from({ length: 50 }).map((_, i) => (
            <Heart key={i} delay={Math.random() * 10} left={Math.random() * 100} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center relative w-full max-w-lg h-[400px]">
            <img src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif" alt="Cute bear with roses" className="w-48 h-48 md:w-64 md:h-64 object-cover mb-4" />
            <h1 className="text-3xl md:text-5xl text-rose-700 mb-8 shadow-text">
            Do you love me?
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <button
                onClick={handleYesClick}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 text-xl"
                style={{ transform: `scale(${yesButtonSize})` }}
            >
                Yes 💖
            </button>
            <button
                ref={noButtonRef}
                onMouseOver={handleNoMouseOver}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 absolute sm:static text-xl"
                style={{top: '75%', left: '55%'}}
            >
                {getNoButtonText()}
            </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;
