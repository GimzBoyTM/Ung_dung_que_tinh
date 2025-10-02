import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-sky-100 text-center p-8">
      <h1 className="text-5xl md:text-7xl font-bold text-sky-700 mb-4 animate-bounce">
        Bé Vui Học Toán
      </h1>
      <p className="text-xl md:text-2xl text-sky-600 mb-8 max-w-lg">
        Cùng học phép cộng với những que tính đầy màu sắc nhé!
      </p>
      <button
        onClick={onStart}
        className="px-8 py-4 bg-yellow-400 text-yellow-900 font-bold text-2xl rounded-full shadow-lg hover:bg-yellow-500 transform hover:scale-110 active:scale-100 transition-all duration-300"
      >
        Bắt đầu nào!
      </button>
    </div>
  );
};

export default WelcomeScreen;
