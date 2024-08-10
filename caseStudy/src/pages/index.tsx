import { useEffect } from "react";
import { useRouter } from "next/router";

import LoginForm from "../components/LoginForm";
import styles from "../styles/Home.module.css";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/patients");
    }
  }, [isLoggedIn, router]);

  return (
    <div className={styles.container}>
      <h1>Hasta Yönetim Sistemi</h1>
      {!isLoggedIn && <LoginForm />}
    </div>
  );
};

export default Home;
