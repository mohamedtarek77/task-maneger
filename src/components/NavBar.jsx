

'use client'
import React, { useState, useEffect } from 'react';

const NavBar = () => {
  const [isFixed, setIsFixed] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    // Attach the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className={`flex items-center justify-start  bg-gray-900 ${isFixed ? 'fixed top-0 w-full' : ''}  bg-blue-900`}>
      <h2 className='px-4 text-lg font-medium text-white'>Task Manager</h2>
    </div>
  );
};

export default NavBar;

