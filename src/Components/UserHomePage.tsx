import React from "react";
import styles from "../styles/UserHomePage.module.css";
import HomePageHeader from "./HomePageHeader";

const UserHomePage = () => {
  return (
    <div className={styles.container}>
      <HomePageHeader />
    </div>
  );
};

export default UserHomePage;
