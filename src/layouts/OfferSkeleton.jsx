import React from "react";
import { Link } from "react-router-dom";

const OfferSkeleton = () => {
  return (
    <div className="w-full mx-auto group lg:max-w-sm animate-pulse">
      <Link className="flex flex-col items-center justify-center">
        <img loading="lazy" className="w-full h-24 rounded-lg bg-slate-200" />
        <div className="text-center">
          <div className="flex my-2">
            <span className="block w-24 h-6 mx-1 text-xs rounded bg-slate-200"></span>
            <span className="block w-24 h-6 mx-1 text-xs rounded bg-slate-200"></span>
          </div>
          <div className="flex mx-auto text-center">
            <span className="block w-24 h-6 mx-1 text-xs rounded bg-slate-200"></span>
            <span className="block w-24 h-6 mx-1 text-xs rounded bg-slate-200"></span>
          </div>
          <div className="flex my-2">
            <span className="block w-24 h-6 mx-1 text-xs rounded bg-slate-200"></span>
            <span className="block w-24 h-6 mx-1 text-xs rounded bg-slate-200"></span>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          <span className="block w-32 h-8 text-sm  bg-slate-200"></span>
          <h3 className="text-lg font-semibold duration-150"></h3>
          <p className="text-sm text-gray-600 duration-150"></p>
        </div>
      </Link>
    </div>
  );
};

export default OfferSkeleton;
