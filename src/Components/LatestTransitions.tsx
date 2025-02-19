"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/LatestTransitions.module.css";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTransactionsFromAPI,
  getTransactionSummaryFromAPI,
} from "@/store/transactionSlice";

const LatestTransitions = () => {
  const [activeTab, setActiveTab] = useState("Expenses");
  const { transactions, income, expenses, savings } = useSelector(
    (state: RootState) => state.transaction
  );

  if (!transactions) return null;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllTransactionsFromAPI(""))
      .unwrap()
      .then((response) => {
        if (response.success) {
        }
      });
    dispatch(getTransactionSummaryFromAPI(""))
      .unwrap()
      .then((response) => {
        if (response.success) {
        }
      });
  }, []);

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
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {["Date", "Name", "Category", "Wallet", "Sum"].map((option) => (
                <th key={option}>{option}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              const transactionDate = new Date(transaction.date);
              const formattedDate =
                transactionDate.getDate() +
                "." +
                (transactionDate.getMonth() + 1) +
                "." +
                transactionDate.getFullYear();
              return (
                <tr key={transaction._id}>
                  <td>{formattedDate}</td>
                  <td>{transaction.name}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.wallet}</td>
                  <td>{transaction.sum}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestTransitions;
