'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { useAppDispatch} from '@/app/reducer/store'; 
import { incrementPoints, decrementPoints } from '@/app/reducer/pointsSlice'; 
import { RootState } from '@/app/reducer/store';
import { useSelector } from 'react-redux';

const Medium: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const points = useSelector((state: RootState) => state.points.points);

  const [gameOver, setGameOver] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(0); 
  const [boxContent, setBoxContent] = useState<string[]>([]);

  const numGems = 2;
  const numBombs = 1;

  useEffect(() => {
    setBoxContent(generateBoxContent());
  }, []);

  const shuffleArray = <T extends any[]>(array: T): T => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const generateBoxContent = (): string[] => {
    const content: string[] = [];
    for (let i = 0; i < numGems; i++) {
      content.push('Gem');
    }
    for (let i = 0; i < numBombs; i++) {
      content.push('Bomb');
    }
    return shuffleArray(content);
  };

  const handleBoxClick = (content: string, index: number) => {
    if (currentFloor === 7) { 
      if (content === 'Bomb') {
        setGameOver(true);
      } else {
        setCurrentFloor(8);
        if (!gameOver) { // Check if all levels are completed
          dispatch(incrementPoints(100)); // Add 100 points when all levels are completed
        }
      }
      return;
    }

    if (content === 'Bomb') {
      setGameOver(true);
    } else {
      setCurrentFloor(currentFloor + 1);
    }
  };

  const handleClick = (route: string, cost: number) => {
    if (points >= cost) {
      router.push(route);
      dispatch(decrementPoints(cost)); // Dispatch action to decrement points
    } else {
      alert('Insufficient points to play!');
    }
  };


  const resetGame = () => {
    setCurrentFloor(0);
    setGameOver(false);
    setBoxContent(generateBoxContent());
    handleClick('/Medium', 20); // Example of calling handleClick with route and cost
  };

  return (
    <div>
      {!gameOver && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Game Board</h1>
          <div className="flex flex-col items-center">
            {[...Array(8).keys()].reverse().map(floor => (
              <div key={floor} className="w-100 h-100 border border-black mb-8 flex justify-center items-center bg-black text-white">
                <p className="text-lg font-semibold">Floor {floor + 1}</p> 
                {currentFloor === floor && (
                  <div className="flex flex-wrap">
                    {boxContent.map((content, index) => (
                      <div key={index} onClick={() => handleBoxClick(content, index)} className="w-12 h-12 border border-white bg-red-400 m-1 flex justify-center items-center cursor-pointer">
                        
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {(currentFloor === 8 && !gameOver) && (
        <div>
          <h1 className="text-2xl font-bold mb-2">Congratulations!</h1>
          <p className="mb-4">You completed all 8 floors.</p>
          <button onClick={resetGame} disabled={points<20} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Play Again</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            <Link href='/'>Home</Link>
          </button>
        </div>
      )}
      {gameOver && (
        <div>
          <h1 className="text-2xl font-bold mb-2">Game Over!</h1>
          <p className="mb-4">You uncovered a bomb.</p>
          <button onClick={resetGame} disabled={points<20} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Play Again</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            <Link href='/'>Home</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Medium;
