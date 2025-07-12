"use client";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import ReactQueryProvider from "./react-query/client";
import ThemeProviderWrapper from "./theme/ThemeProvider";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProviderWrapper>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProviderWrapper>
      </PersistGate>
    </Provider>
  );
};

export default MainProvider;
