"use client";

import { ThemeProvider } from "@/context/theme-context";
import { store } from "@/store";
import { Provider } from "react-redux";
import Header from "../header";
import Footer from "../footer";
import { ReactNode } from "react";

const LayoutContent = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </ThemeProvider>
    </Provider>
  );
};

export default LayoutContent;
