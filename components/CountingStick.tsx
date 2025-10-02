import React from 'react';

interface CountingStickProps {
  color: string;
}

const CountingStick: React.FC<CountingStickProps> = ({ color }) => {
  return (
    <div className={`w-3 h-24 md:w-4 md:h-28 rounded-full shadow-md ${color}`}></div>
  );
};

export default CountingStick;
