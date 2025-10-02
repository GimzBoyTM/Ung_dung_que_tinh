import React, { useState, useEffect } from 'react';
import CountingStick from './CountingStick';

const NumberControl: React.FC<{
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  color: string;
  stickColor: string;
  maxValue?: number;
}> = ({ value, setValue, color, stickColor, maxValue }) => {
  const max = maxValue ?? 10;
  const increment = () => setValue((v) => Math.min(max, v + 1));
  const decrement = () => setValue((v) => Math.max(0, v - 1));

  return (
    <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white/50 w-full">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={decrement}
          disabled={value === 0}
          className={`w-12 h-12 rounded-full text-white text-3xl font-bold shadow-md transition-all duration-200 ${color} disabled:bg-gray-300 disabled:cursor-not-allowed active:scale-90`}
          aria-label="Bớt que tính"
        >
          -
        </button>
        <button
          onClick={increment}
          disabled={value === max}
          className={`w-12 h-12 rounded-full text-white text-3xl font-bold shadow-md transition-all duration-200 ${color} disabled:bg-gray-300 disabled:cursor-not-allowed active:scale-90`}
          aria-label="Thêm que tính"
        >
          +
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-2 min-h-[120px] items-end pt-2">
        {Array.from({ length: value }).map((_, i) => (
          <CountingStick key={`stick-${i}`} color={stickColor} />
        ))}
      </div>
    </div>
  );
};

const InteractiveCalculator: React.FC = () => {
  const [num1, setNum1] = useState(2);
  const [num2, setNum2] = useState(1);
  const [sum, setSum] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [operation, setOperation] = useState<'addition' | 'subtraction'>('addition');

  // Reset answer if numbers or operation change
  useEffect(() => {
    setShowAnswer(false);
    setSum(null);
  }, [num1, num2, operation]);

  // Ensure num2 is not greater than num1 in subtraction mode
  useEffect(() => {
    if (operation === 'subtraction' && num2 > num1) {
      setNum2(num1);
    }
  }, [operation, num1]);

  const handleCalculate = () => {
    if (isCalculating) return;
    if (operation === 'addition' && num1 === 0 && num2 === 0) return;
    if (operation === 'subtraction' && num1 === 0) return;


    setIsCalculating(true);
    
    // Giả lập một khoảng trễ nhỏ để tạo cảm giác "tính toán"
    setTimeout(() => {
      const result = operation === 'addition' ? num1 + num2 : num1 - num2;
      setSum(String(result));
      setShowAnswer(true);
      setIsCalculating(false);
    }, 500);
  };
  
  const handleReset = () => {
    setNum1(operation === 'addition' ? 1 : 2);
    setNum2(1);
    setShowAnswer(false);
    setSum(null);
  }

  const operatorSymbol = operation === 'addition' ? '+' : '-';

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-between min-h-[75vh]">
      <h2 className="text-3xl md:text-4xl font-bold text-sky-700 mb-4 text-center">
        Cùng ghép que tính nhé!
      </h2>

      <div className="flex justify-center gap-4 mb-4">
        {(['addition', 'subtraction'] as const).map((op) => (
          <button
            key={op}
            onClick={() => setOperation(op)}
            className={`w-16 h-16 rounded-full text-4xl font-bold shadow-md transition-all duration-300 flex items-center justify-center ${
              operation === op
                ? 'bg-sky-500 text-white scale-110'
                : 'bg-white/60 text-sky-600 hover:bg-sky-100'
            }`}
          >
            {op === 'addition' ? '+' : '−'}
          </button>
        ))}
      </div>

      <div className="flex-grow flex flex-col md:flex-row items-center justify-around w-full my-4 gap-4">
        <NumberControl value={num1} setValue={setNum1} color="bg-pink-500" stickColor="bg-pink-400" />
        <div className="text-7xl text-gray-300 font-light transition-all duration-500 my-4 md:my-0">
          {operatorSymbol}
        </div>
        <NumberControl value={num2} setValue={setNum2} color="bg-teal-500" stickColor="bg-teal-400" maxValue={operation === 'subtraction' ? num1 : 10} />
      </div>

      <div className="mt-auto h-48 flex flex-col items-center justify-center">
        {showAnswer ? (
          <div className="text-center animate-fade-in">
             <>
                <div className="flex items-center justify-center transition-all duration-1000 ease-in-out gap-2 mb-4 min-h-[120px]">
                    {/* Visual Result */}
                    {operation === 'addition' && (
                        <>
                         {Array.from({ length: num1 }).map((_, i) => (
                            <CountingStick key={`n1-${i}`} color="bg-pink-400" />
                         ))}
                         {Array.from({ length: num2 }).map((_, i) => (
                            <CountingStick key={`n2-${i}`} color="bg-teal-400" />
                         ))}
                        </>
                    )}
                    {operation === 'subtraction' && (
                        <>
                         {Array.from({ length: num1 - num2 }).map((_, i) => (
                            <CountingStick key={`res-${i}`} color="bg-purple-400" />
                          ))}
                        </>
                    )}
                </div>
                <p className="text-4xl md:text-5xl font-bold text-gray-700">
                    {num1} <span className="text-sky-400 mx-2">{operatorSymbol}</span> {num2} <span className="text-sky-400 mx-2">=</span> <span className="text-green-600">{sum}</span>
                </p>
            </>
            <button
                onClick={handleReset}
                className="mt-6 px-6 py-3 bg-yellow-400 text-yellow-900 font-bold text-xl rounded-full shadow-lg hover:bg-yellow-500 transform hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Làm phép tính mới!
              </button>
          </div>
        ) : (
          <button
            onClick={handleCalculate}
            disabled={isCalculating || (operation === 'addition' && num1 === 0 && num2 === 0)}
            className="px-8 py-4 bg-green-500 text-white font-bold text-2xl rounded-full shadow-lg hover:bg-green-600 transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-wait flex items-center gap-3"
          >
            {isCalculating ? (
              <>
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang tính...
              </>
            ) : (
              'Bằng bao nhiêu nhỉ?'
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InteractiveCalculator;
