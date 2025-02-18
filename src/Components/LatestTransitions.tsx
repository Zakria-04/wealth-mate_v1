"use client";
import React, { useState } from "react";
import styles from "../styles/LatestTransitions.module.css";

const LatestTransitions = () => {
  const [activeTab, setActiveTab] = useState("Expenses");
  return (
    <div className={styles.container}>
      {/* transition header */}
      <header className={styles.header}>
        <p>Recent transactions</p>
        <button>+ Add transaction</button>
      </header>

      {/* recent transition options */}
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

      {/* category render and filter */}
      <div>
        <div></div>
      </div>

      {/* recent transition render */}
      <table className={styles.table}>
        <thead>
          <tr>
            {["Date", "Name", "Category", "Wallet", "Sum"].map((option) => (
              <th key={option}>{option}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LatestTransitions;
