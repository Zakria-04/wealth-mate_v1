import React from "react";
import styles from "../styles/Summary.module.css";
import Image from "next/image";
import Images from "@/assets/Images/Images";

const Summary = () => {
  return (
    <div>
      <div className={styles.summaryHeader}>
        <span>Summary</span>
        <select>
          <option value="">Daily</option>
          <option value="">Monthly</option>
          <option value="">Yearly</option>
        </select>
      </div>
      <div className={styles.summaryBoxContainer}>
        {/*  Balance */}
        <div className={styles.summaryBox}>
          <Image
            src={Images.balance}
            alt="Balance"
            width={20}
            height={20}
            className={styles.summaryIcons}
          />
          <div>
            <p>Total Balance</p>
            <p>2000.00$</p>
          </div>
        </div>

        {/* Expenses */}
        <div className={styles.summaryBox}>
          <Image
            src={Images.expenses}
            alt="Balance"
            width={20}
            height={20}
            className={styles.summaryIcons}
          />
          <div>
            <p>Expenses</p>
            <p>2000.00$</p>
          </div>
        </div>

        {/* Income */}
        <div className={styles.summaryBox}>
          <Image
            src={Images.income}
            alt="Balance"
            width={25}
            height={20}
            className={styles.summaryIcons}
          />
          <div>
            <p>Income</p>
            <p>2000.00$</p>
          </div>
        </div>

        {/* Savings */}
        <div className={styles.summaryBox}>
          <Image
            src={Images.savings}
            alt="Balance"
            width={20}
            height={20}
            className={styles.summaryIcons}
          />
          <div>
            <p>Savings</p>
            <p>2000.00$</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
