import React from 'react';

const TestModeBar: React.FC = () => {
  return (
    <div className="bg-yellow-500 text-black py-2 px-4 text-center font-bold">
      <span className="animate-pulse">Test mode!</span>
    </div>
  );
};

export default TestModeBar;
