import Meta from "./Meta";
import Nav from "./Nav";
import styles from "../styles/Layout.module.css";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

const publicRoutes = ["/", "/about"];

export const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState("");
  const session = useSession();
  const supabase = useSupabaseClient();

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    setIsLoading(false);
  });

  let Rendered;

  if (isLoading) {
    Rendered = Spinner;
  } else if (!session && !publicRoutes.includes(currentPath)) {
    Rendered = () => <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />;
  } else {
    Rendered = () => children;
  }

  return (
    <>
      <Meta />
      <Nav />
      <div className={styles.container}>
        <main className={styles.main}>
          <Rendered />
        </main>
      </div>
    </>
  );
};

export default Layout;
