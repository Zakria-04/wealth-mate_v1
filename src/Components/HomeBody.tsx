import React from "react";
import styles from "../styles/HomeBody.module.css";

const HomeBody = () => {
  return (
    <div className={styles.container}>
      <h1>
        Your personal finance
        <br /> companion
      </h1>

      <p>
        designed to help you manage your <br /> finances effortlessly
      </p>

      <button>Get Started</button>
      <span>Start for free. No credit card required.</span>
    </div>
  );
};

export default HomeBody;
