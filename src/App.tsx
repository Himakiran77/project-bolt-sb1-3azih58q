import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { Cake, Heart, Stars, Gift, Volume2, VolumeX } from 'lucide-react';

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio('./birthday-song.mp3'));

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    audio.loop = true;
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const floatingBalloons = Array(6).fill(null).map((_, i) => (
    <motion.div
      key={i}
      className="absolute"
      initial={{ y: '100vh' }}
      animate={{
        y: '-100vh',
        x: Math.sin(i) * 100,
      }}
      transition={{
        duration: 15 + Math.random() * 10,
        repeat: Infinity,
        delay: i * 2,
      }}
    >
      <div className={`w-12 h-16 rounded-full ${['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-green-500'][i]} relative`}>
        <div className="absolute bottom-0 left-1/2 w-1 h-10 bg-gray-300 -translate-x-1/2"></div>
      </div>
    </motion.div>
  ));

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 overflow-hidden">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-20 bg-white bg-opacity-20 backdrop-blur-lg p-3 rounded-full shadow-lg"
      >
        {isPlaying ? (
          <Volume2 className="text-white w-6 h-6" />
        ) : (
          <VolumeX className="text-white w-6 h-6" />
        )}
      </motion.button>

      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={true}
        numberOfPieces={200}
      />
      
      {floatingBalloons}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 md:p-12 shadow-2xl max-w-2xl w-full text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Cake size={64} className="text-white" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Happy Birthday To You Anjali Mam  
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block ml-2"
            >
              🎉
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white mb-8"
          >
            Wishing you a day filled with joy, laughter, and unforgettable moments. May this year bring you success, happiness, and good health!
          </motion.p>

          <div className="flex justify-center gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center"
            >
              <Heart className="text-white w-8 h-8 mb-2" />
              <span className="text-white">Love</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center"
            >
              <Stars className="text-white w-8 h-8 mb-2" />
              <span className="text-white">Dreams</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center"
            >
              <Gift className="text-white w-8 h-8 mb-2" />
              <span className="text-white">Gifts</span>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Make a Wish! ✨
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default App;