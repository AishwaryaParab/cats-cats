"use client";

import { ThemeProvider } from "@/context/theme-context";
import { store } from "@/store";
import { Provider } from "react-redux";
import Header from "../header";
import Footer from "../footer";
import { ReactNode, Suspense } from "react";
import LoadingSpinner from "../ui/loading-spinner";
import { CompareProvider } from "@/context/compare-context";

const LayoutContent = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <CompareProvider>
        <ThemeProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </Suspense>
        </ThemeProvider>
      </CompareProvider>
    </Provider>
  );
};

export default LayoutContent;
