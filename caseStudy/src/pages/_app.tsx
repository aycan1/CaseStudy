import { useEffect } from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { store } from "../store";
import { useAppDispatch } from "../hooks/reduxHooks";
import { setLoadedState } from "../store/patinetSlice";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <StateLoader>
          <Component {...pageProps} />
        </StateLoader>
      </Provider>
    </AuthProvider>
  );
}

function StateLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedState = localStorage.getItem("patientState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      dispatch(setLoadedState(parsedState));
    }
  }, [dispatch]);

  return <>{children}</>;
}

export default MyApp;
