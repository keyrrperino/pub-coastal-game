import React, { useEffect, useRef } from "react";

export default function AnimatedTitle({ children }: {children: React.ReactNode;}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let running = true;
    function randomZoom() {
      if (!running || !ref.current) return;
      // Random scale between 1 and 1.3
      const scale = 1 + Math.random() * 0.3;
      // Random duration between 0.4s and 1.2s
      const duration = 400 + Math.random() * 800;
      ref.current.style.transition = `transform ${duration}ms cubic-bezier(.36,.07,.19,.97)`;
      ref.current.style.transform = `scale(${scale})`;
      setTimeout(() => {
        if (!running || !ref.current) return;
        ref.current.style.transition = `transform ${duration}ms cubic-bezier(.36,.07,.19,.97)`;
        ref.current.style.transform = `scale(1)`;
        setTimeout(() => {
          if (running) randomZoom();
        }, duration);
      }, duration);
    }
    randomZoom();
    return () => {
      running = false;
    };
  }, []);

  return (
    <div
      ref={ref}
      className="text-[3vw] font-bold text-center text-white flex flex-col items-center"
    >
      {children}
    </div>
  );
}