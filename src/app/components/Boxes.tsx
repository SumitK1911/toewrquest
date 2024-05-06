'use client'
// components/Boxes.tsx

import React, { useState } from 'react';

const Boxes: React.FC = () => {
  const [boxes, setBoxes] = useState<string[]>(['gem', 'gem', 'gem', 'bomb'].sort(() => Math.random() - 0.5));
  const [message, setMessage] = useState<string>('');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [level, setLevel] = useState<number>(1);
  const [counter, setCounter] = useState<number>(0);

  const handleClick = (index: number) => {
    if (!isGameOver) {
      if (boxes[index] === 'gem') {
        setCounter(counter + 1);
        setMessage(`You won! You reached level ${level + 1}`);
        setLevel(level + 1);
        setBoxes(['gem', 'gem', 'gem', 'bomb'].sort(() => Math.random() - 0.5));
      } else {
        setMessage('You lose!');
        setIsGameOver(true);
      }
    }
  };

  const handlePlayAgain = () => {
    setLevel(1);
    setBoxes(['gem', 'gem', 'gem', 'bomb'].sort(() => Math.random() - 0.5));
    setMessage('');
    setIsGameOver(false);
    setCounter(0);
  };

  return (
    <div className="flex flex-col items-center">
       <div className="my-4 text-xl font-bold"> {message}</div>
      <div className='flex flex-row bg-black w-[250px] h-[250px] items-center'>
        <div className='flex flex-row gap-5 mx-11'>
          {boxes.map((item, index) => (
            <div
              key={index}
              className={`bg-${item === 'gem' ? 'white' : 'white'} w-[20px] h-[20px] cursor-pointer`}
              onClick={() => handleClick(index)}
            ></div>
          ))}
        </div>
        {isGameOver && (
          <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 text-white'>
            <div className='bg-gray-700 p-4 rounded-md'>
              <p>{message}</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePlayAgain}>Play Again?</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Boxes;
