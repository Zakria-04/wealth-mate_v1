import React from "react";
import styles from "../styles/UserHomePage.module.css";
import HomePageHeader from "./HomePageHeader";
import Summary from "./Summary";

const UserHomePage = () => {
  return (
    <div>
      <HomePageHeader />
      <div className={styles.body}>
        <Summary />
      </div>
    </div>
  );
};

export default UserHomePage;
