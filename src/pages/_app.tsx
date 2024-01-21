import type { AppProps } from "next/app";
import '../globals.css';
import Header from "@/components/header";
import { ThemeProvider } from "next-themes";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
