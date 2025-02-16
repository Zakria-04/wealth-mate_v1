import React from "react";
import styles from "../styles/UserHomePage.module.css";
import HomePageHeader from "./HomePageHeader";
import Summary from "./Summary";
import LatestTransitions from "./LatestTransitions";

const UserHomePage = () => {
  return (
    <div>
      <HomePageHeader />
      <div className={styles.body}>
        <Summary />
        <LatestTransitions />
      </div>
    </div>
  );
};

export default UserHomePage;
