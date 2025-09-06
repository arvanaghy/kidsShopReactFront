import React from "react";
interface JumpingDotsProps {
  color?: string;
}

const JumpingDots: React.FC<JumpingDotsProps> = ({ color = 'bg-blue-500' }) => {
  return (
    <div className="flex justify-center items-center">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className={`w-1 h-1 mx-1 ${color} rounded-full animate-jump`}
          style={{ animationDelay: `${index * 0.2}s` }}
        ></div>
      ))}
    </div>
  );
};

export default JumpingDots;
