import Meta from "./Meta";
import Nav from "./Nav";
import styles from "../styles/Layout.module.css";

export const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Nav />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
