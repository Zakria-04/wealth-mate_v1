"use client";
import React, { useState } from "react";
import styles from "../styles/LatestTransitions.module.css";

const LatestTransitions = () => {
  const [activeTab, setActiveTab] = useState("Expenses");
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p>Recent transactions</p>
        <button>+ Add transaction</button>
      </header>

      <div className={styles.latestOptionsContainer}>
        <div className={styles.options}>
          {["Expenses", "Income", "Saving"].map((option) => (
            <p
              key={option}
              className={activeTab === option ? `${styles.active}` : ""}
              onClick={() => setActiveTab(option)}
            >
              {option}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestTransitions;
