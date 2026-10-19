import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-4">
      <div className="relative flex items-center justify-center">
        <span className="absolute h-24 w-24 animate-ping rounded-full bg-red-300 opacity-40" />
        <span className="absolute h-20 w-20 rounded-full border-4 border-red-200" />
        <span className="h-20 w-20 animate-spin rounded-full border-4 border-transparent border-t-red-700 border-r-red-500" />
        <span className="absolute text-xl font-extrabold text-red-700">N</span>
      </div>

      <h2 className="mt-8 text-xl font-semibold text-red-900">
        লোড হচ্ছে
      </h2>

      <div className="mt-3 flex gap-2">
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-red-600 [animation-delay:-0.3s]" />
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-red-600 [animation-delay:-0.15s]" />
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-red-600" />
      </div>
    </div>
  );
};

export default Loading;