import Header from "@/components/Header";
import "@/styles/globals.css";
import {NextUIProvider} from "@nextui-org/react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header/>
      <NextUIProvider>
        <main>
          <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <Component {...pageProps} />
          </div>
        </main>
      </NextUIProvider>
    </>
  );
}
