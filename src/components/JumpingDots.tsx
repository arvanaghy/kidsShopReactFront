import React from "react";
interface JumpingDotsProps {
  color?: string;
}

const JumpingDots: React.FC<JumpingDotsProps> = ({ color = 'bg-blue-500' }) => {
  return (
    <span className="flex justify-center items-center">
      {[1, 2, 3].map((index) => (
        <span
          key={index}
          className={`w-1 h-1 mx-1 ${color} rounded-full animate-jump`}
          style={{ animationDelay: `${index * 0.2}s` }}
        ></span>
      ))}
    </span>
  );
};

export default JumpingDots;
