import "@/styles/globals.css";
import "@/styles/game.css";
import type { AppProps } from "next/app";
import { Righteous } from "next/font/google";

const gameFont = Righteous({ 
  weight: "400",
  subsets: ["latin"] 
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={gameFont.className}>
      <Component {...pageProps} />
    </div>
  );
}
