import React from "react";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
      <h1>Wealth Mate</h1>
      <div className={styles.btnContainer}>
        <a href="">LogIn</a>
        <div className={styles.signUpBtn}>
          <a href="">Get Started</a>
        </div>
      </div>
    </div>
  );
};

export default Header;
