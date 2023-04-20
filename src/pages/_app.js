import Layout from "../components/Layout";
import "../styles/globals.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import ToastManager from "../components/ToastManager";

function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <>
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionContextProvider>
      <ToastManager />
    </>
  );
}

export default MyApp;
