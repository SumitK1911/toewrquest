'use client'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/app/reducer/store';
import { decrementPoints, incrementPoints } from '@/app/reducer/pointsSlice';


const Outlook: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const points = useSelector((state: RootState) => state.points.points);

  const handleClick = (route: string, cost: number) => {
    if (points >= cost) {
      router.push(route);
      dispatch(decrementPoints(cost)); // Decrease points when navigating to a game
    } else {
      alert('Insufficient points to play!');
    }
  };

  // Function to handle following on Instagram and increasing points
  const handleFollowInstagram = () => {
    const followCost = 100; 
    dispatch(incrementPoints(followCost)); 
    window.location.href = 'https://www.instagram.com/soamyit/'; // mero Instagram profile
  };

  return (
    <div className='flex flex-col items-center justify-center'>
    <div className='flex flex-row w-[350px] h-[250px] bg-black items-center justify-center gap-3 relative'>
      {/* Points */}
      <div className='text-white absolute top-0 right-0 m-2'>Points: {points}</div>

      {/* Outlook buttons */}
      <div className='w-[60px] h-[30px] bg-white text-center cursor-pointer' onClick={() => handleClick('/Normal', 25)}>
        <div className='text-yellow-500 hover:text-blue-500 '>Normal</div>
      </div>
      <div className='w-[60px] h-[30px] bg-white text-center cursor-pointer' onClick={() => handleClick('/Medium', 20)}>
        <div className='text-yellow-500 hover:text-blue-500 '>Medium</div>
      </div>
      <div className='w-[60px] h-[30px] bg-white text-center cursor-pointer' onClick={() => handleClick('/Hard', 10)}>
        <div className='text-yellow-500 hover:text-blue-500 '>Hard</div>
      </div>
      <div className='w-[80px] h-[30px] bg-white text-center cursor-pointer' onClick={() => handleClick('/Impossible', 5)}>
        <div className='text-yellow-500 hover:text-blue-500 '>Impossible</div>
      </div>

    </div>
    <div className='w-[120px] h-[30px] bg-white text-center cursor-pointer ' onClick={handleFollowInstagram}>
        <div className='text-yellow-500 hover:text-blue-500 '>Follow on Instagram To INcrease 100 Points</div>
      </div>
    </div>
  );
};

export default Outlook;
