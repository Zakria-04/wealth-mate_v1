"use client";
import React from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.container}>
      <h1>Wealth Mate</h1>
      <div className={styles.btnContainer}>
        <Link
          href={{
            pathname: "/auth",
            query: { authStatus: "login" },
          }}
          style={{ textDecoration: "none" }}
        >
          <p>LogIn</p>
        </Link>
        <Link
          href={{
            pathname: "/auth",
            query: { authStatus: "signup" },
          }}
          className={styles.signUpBtn}
        >
          <p>Get Started</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
