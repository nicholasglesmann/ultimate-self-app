import headerStyles from "../styles/Header.module.css";

export const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>Ultimate</span> Self App
      </h1>
      <p className={headerStyles.description}>Become your best you</p>
    </div>
  );
};

export default Header;
