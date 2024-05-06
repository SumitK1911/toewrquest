'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const Floorup: React.FC = () => {
    const [boxes, setBoxes] = useState<string[]>(['gem', 'gem', 'gem', 'bomb'].sort(() => Math.random() - 0.5));
    const [message, setMessage] = useState<string>('');
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [showBoxes, setShowBoxes] = useState<boolean[]>([true, true, true, true]);

    const handleClick = (index: number, inSecondDiv: boolean) => {
        if (!isGameOver) {
            if (inSecondDiv) {
                if (boxes[index] === 'gem') {
                    setBoxes(['gem', 'gem', 'gem', 'bomb'].sort(() => Math.random() - 0.5));
                    setShowBoxes([true, true, true, true]); // Show all boxes in first div
                } else {
                    setMessage('You lose!');
                    setIsGameOver(true);
                }
            } else {
                if (boxes[index] === 'gem') {
                    // Remove all white boxes in the first div
                    setShowBoxes([false, false, false, false]);
                }
            }
            console.log(`Clicked box at index ${index}: ${boxes[index]}`);
        }
    };

    const handlePlayAgain = () => {
        setBoxes(['gem', 'gem', 'gem', 'bomb'].sort(() => Math.random() - 0.5));
        setMessage('');
        setIsGameOver(false);
        setShowBoxes([true, true, true, true]); // Show all boxes in first div
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center">
                <div className="my-4 text-xl font-bold">{message}</div>
                <div className="flex flex-row bg-black w-[250px] h-[250px] items-center">
                    <div className="flex flex-row gap-5 mx-11">
                        {showBoxes.map((showBox, index) => (
                            <div
                                key={index}
                                className={`w-[20px] h-[20px] cursor-pointer ${showBox ? 'bg-white' : 'bg-black'}`}
                                onClick={() => handleClick(index, false)}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
            {isGameOver && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 text-white">
                    <div className="bg-gray-700 p-4 rounded-md">
                        <div className="flex flex-row gap-3 p-2">
                            <p>{message}</p>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                                <Link href="/">Back</Link>
                            </button>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePlayAgain}>
                            Play Again?
                        </button>
                    </div>
                </div>
            )}
            <div className="flex flex-col items-center">
                <div className="my-4 text-xl font-bold">{message}</div>
                <div className="flex flex-row bg-black w-[250px] h-[250px] items-center">
                    <div className="flex flex-row gap-5 mx-11">
                        {boxes.map((item, index) => (
                            <div
                                key={index}
                                className={`w-[20px] h-[20px] cursor-pointer ${showBoxes[index] ? 'bg-white' : 'bg-black'}`}
                                onClick={() => handleClick(index, true)}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Floorup;
