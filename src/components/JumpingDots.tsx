import React from "react";

const JumpingDots: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="w-1 h-1 mx-1 bg-blue-500 rounded-full animate-jump"
          style={{ animationDelay: `${index * 0.2}s` }}
        ></div>
      ))}
    </div>
  );
};

export default JumpingDots;
