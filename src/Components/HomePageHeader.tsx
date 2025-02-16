"use client";
import React from "react";
import styles from "../styles/HomePageHeader.module.css";
import Image from "next/image";
import Images from "@/assets/Images/Images";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const HomePageHeader = () => {
  const { user } = useSelector((state: RootState) => state.user);
  console.log(user);

  return (
    <div className={styles.container}>
      <Image
        src={Images.koala}
        alt="Profile-img"
        width={50}
        height={50}
        priority
      />

      <p>{`Welcome back, ${user?.user?.userName}`}</p>
    </div>
  );
};

export default HomePageHeader;
