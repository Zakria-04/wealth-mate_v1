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
  const { transactions } = useSelector((state: RootState) => state.transaction);

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

  // get categories
  const getCategories = new Set(
    transactions.map((transaction) => transaction.category)
  );

  // get transactions unique dates

  const uniqueDates = new Set(
    transactions.map((transaction) => {
      const date = new Date(transaction.date);
      return date.toISOString().split("T")[0];
    })
  );

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
      <div className={styles.filterContainer}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="11px"
            viewBox="0 0 18 12"
            width="17px"
          >
            <g fill="none" fillRule="evenodd">
              <g fill="#3c3737">
                <path d="M7,12 L11,12 L11,10 L7,10 L7,12 L7,12 Z M0,0 L0,2 L18,2 L18,0 L0,0 L0,0 Z M3,7 L15,7 L15,5 L3,5 L3,7 L3,7 Z" />
              </g>
            </g>
          </svg>
          <span>Filter by:</span>
        </div>

        <div className={styles.categoryContainer}>
          {/* date filter */}
          <div>
            <select name="date" defaultValue="">
              <option disabled value="">
                Date
              </option>
              {Array.from(uniqueDates).map((getTransactionsDate) => {
                console.log(getTransactionsDate);
                
                const transactionDate = new Date(getTransactionsDate);
                const formattedDate =
                  transactionDate.getDate() +
                  "." +
                  (transactionDate.getMonth() + 1) +
                  "." +
                  transactionDate.getFullYear();
                return (
                  <option key={getTransactionsDate} value={getTransactionsDate}>
                    {formattedDate}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
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
