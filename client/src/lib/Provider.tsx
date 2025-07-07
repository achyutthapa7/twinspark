"use client";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import ReactQueryProvider from "./react-query/client";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </PersistGate>
    </Provider>
  );
};

export default MainProvider;
