import React, { useState } from 'react';
import Slide from './components/Slide';
import WelcomeScreen from './components/WelcomeScreen';

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    setIsStarted(true);
  };

  if (!isStarted) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  return (
    <main className="w-full min-h-screen bg-sky-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-5xl relative">
        <Slide />
      </div>
      
      <footer className="text-center text-sky-600 mt-8">
        <p>Made by <a href="https://www.facebook.com/vuduythanh.1205" target="_blank" rel="noopener noreferrer" className="underline hover:text-sky-800">Duy Thành</a></p>
      </footer>
    </main>
  );
};

export default App;