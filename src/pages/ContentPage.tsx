import React, { useState } from 'react';
import ContentCard from '../components/ContentCard';
import DraggableWrapper from '../components/DraggableWrapper';

const contentList = [
  { text: "The journey of a thousand miles begins with a single step.", source: "Lao Tzu" },
  { text: "Life is what happens when you're busy making other plans.", source: "John Lennon" },
  { text: "You miss 100% of the shots you don't take.", source: "Wayne Gretzky" },
  // Add more content objects as needed
];

const ContentPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [leftButtonActive, setLeftButtonActive] = useState(false);
  const [rightButtonActive, setRightButtonActive] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % contentList.length);
    // Flash right button
    setRightButtonActive(true);
    setTimeout(() => setRightButtonActive(false), 200);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + contentList.length) % contentList.length);
    // Flash left button
    setLeftButtonActive(true);
    setTimeout(() => setLeftButtonActive(false), 200);
  };

  const handleLeftButtonClick = () => {
    handlePrevious();
  };

  const handleRightButtonClick = () => {
    handleNext();
  };

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center p-4">
      <div className="relative">
        <DraggableWrapper
          onSwipeLeft={handlePrevious}
          onSwipeRight={handleNext}
          threshold={300}
          circularMotion={true}
          radius={350}
          className="touch-none"
        >
          <ContentCard 
            text={contentList[currentIndex].text} 
            source={contentList[currentIndex].source} 
          />
        </DraggableWrapper>
        
        {/* Left Button */}
        <button
          onClick={handleLeftButtonClick}
          className={`absolute left-0 bottom-[-60px] w-12 h-12 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
            leftButtonActive 
              ? 'bg-blue-500 border-blue-500 text-white scale-110' 
              : 'bg-white border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600'
          }`}
          aria-label="Previous content"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        
        {/* Right Button */}
        <button
          onClick={handleRightButtonClick}
          className={`absolute right-0 bottom-[-60px] w-12 h-12 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
            rightButtonActive 
              ? 'bg-blue-500 border-blue-500 text-white scale-110' 
              : 'bg-white border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600'
          }`}
          aria-label="Next content"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ContentPage;