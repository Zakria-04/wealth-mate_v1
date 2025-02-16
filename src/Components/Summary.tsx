import React from "react";
import styles from "../styles/Summary.module.css";
import Image from "next/image";
import Images from "@/assets/Images/Images";

const summaryData = [
  { label: "Total Balance", value: "2000.00$", image: Images.balance },
  { label: "Expenses", value: "2000.00$", image: Images.expenses },
  { label: "Income", value: "2000.00$", image: Images.income },
  { label: "Savings", value: "2000.00$", image: Images.savings },
];

// render summaryData component
const SummaryBox = ({
  label,
  value,
  image,
}: {
  label: string;
  value: string;
  image: string;
}) => (
  <div className={styles.summaryBox}>
    <div className={styles.summaryIcons}>
      <Image src={image} alt={label} width={20} height={20} />
    </div>
    <div>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
    </div>
  </div>
);

const Summary = () => {
  return (
    <section>
      <header className={styles.summaryHeader}>
        <span>Summary</span>
        <select aria-label="Select summary period">
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </header>

      <div className={styles.summaryBoxContainer}>
        {summaryData.map((item, index) => (
          <SummaryBox key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Summary;
