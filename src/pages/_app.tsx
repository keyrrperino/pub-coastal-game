import "@/styles/globals.css";
import "@/styles/game.css";
import type { AppProps } from "next/app";
import { ServerTimeProvider } from "@/components/ServerTimeContext";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ServerTimeProvider>
      <div>
        <Component {...pageProps} />
      </div>
    </ServerTimeProvider>
  );
}