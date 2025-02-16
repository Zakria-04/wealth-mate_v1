import React from "react";
import styles from "../styles/LatestTransitions.module.css";

const LatestTransitions = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p>Recent transactions</p>
        <button>+ Add transaction</button>
      </header>
    </div>
  );
};

export default LatestTransitions;
