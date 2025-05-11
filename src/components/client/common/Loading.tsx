"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-transparent">
      <DotLottieReact
        src="/lottie/loading.lottie"
        loop
        autoplay
        style={{ height: 400, width: 400 }}
      />
    </div>
  );
}