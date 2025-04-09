import React from "react";

const SpinnerLoading = () => {
  return (
    <div className="fixed -mt-[10vh] h-screen w-full bg-glassy z-50 flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="50"
        height="50"
      >
        <radialGradient
          id="a12"
          cx=".66"
          fx=".66"
          cy=".3125"
          fy=".3125"
          gradientTransform="scale(1.5)"
        >
          <stop offset="0" stopColor="#555AFF"></stop>
          <stop offset=".3" stopColor="#555AFF" stopOpacity=".9"></stop>
          <stop offset=".6" stopColor="#555AFF" stopOpacity=".6"></stop>
          <stop offset=".8" stopColor="#555AFF" stopOpacity=".3"></stop>
          <stop offset="1" stopColor="#555AFF" stopOpacity="0"></stop>
        </radialGradient>
        <circle
          transform-origin="center"
          fill="none"
          stroke="url(#a12)"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeDasharray="100 500"
          strokeDashoffset="0"
          cx="50"
          cy="50"
          r="35"
        >
          <animateTransform
            type="rotate"
            attributeName="transform"
            calcMode="spline"
            dur="2"
            values="360;0"
            keyTimes="0;1"
            keySplines="0 0 1 1"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>
        <circle
          transform-origin="center"
          fill="none"
          opacity=".2"
          stroke="#555AFF"
          strokeWidth="7.5"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="35"
        ></circle>
      </svg>
    </div>
  );
};

export default SpinnerLoading;
