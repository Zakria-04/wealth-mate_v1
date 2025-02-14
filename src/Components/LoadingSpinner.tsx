import React from "react";
import styles from "../styles/LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default LoadingSpinner;
