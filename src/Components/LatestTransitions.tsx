"use client";
import React, { useEffect, useState, useCallback } from "react";
import styles from "../styles/LatestTransitions.module.css";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTransactionsFromAPI,
  getTransactionSummaryFromAPI,
} from "@/store/transactionSlice";

interface Transaction {
  _id: string;
  date: string;
  name: string;
  category: string;
  wallet: string;
  sum: number;
}

const LatestTransitions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Expenses");
  const [nameSelected, setNameSelected] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { transactions } = useSelector((state: RootState) => state.transaction);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionsResponse = await dispatch(getAllTransactionsFromAPI("")).unwrap();
        if (transactionsResponse.success) {
          // Handle success
        }

        const summaryResponse = await dispatch(getTransactionSummaryFromAPI("")).unwrap();
        if (summaryResponse.success) {
          // Handle success
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Get unique dates, names, and categories
  const uniqueDates = Array.from(
    new Set(
      transactions.map((transaction) => {
        const date = new Date(transaction.date);
        return date.toISOString().split("T")[0];
      })
    )
  );

  const uniqueTransactionNames = Array.from(
    new Set(transactions.map((transaction) => transaction.name))
  );

  const uniqueCategories = Array.from(
    new Set(transactions.map((transaction) => transaction.category))
  );

  const getUniqueMonthsAndYears = Array.from(
    new Set(
      uniqueDates.map((date) => {
        const dateObj = new Date(date);
        return JSON.stringify({
          month: dateObj.getMonth() + 1,
          year: dateObj.getFullYear(),
        });
      })
    )
  ).map((str) => JSON.parse(str));

  // Filter transactions based on selected filters
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date).toISOString().split("T")[0];
    const matchesDate = selectedDate ? transactionDate === selectedDate : true;
    const matchesName = selectedName ? transaction.name === selectedName : true;
    const matchesCategory = selectedCategory ? transaction.category === selectedCategory : true;
    const matchesSearch = searchQuery
      ? transaction.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesDate && matchesName && matchesCategory && matchesSearch;
  });

  const handleDateFilter = useCallback((date: string) => {
    setSelectedDate(date);
  }, []);

  const handleNameFilter = useCallback((name: string) => {
    setSelectedName(name);
    setNameSelected(false); // Close the name dropdown after selection
  }, []);

  const handleCategoryFilter = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  if (!transactions) return null;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p>Recent transactions</p>
        <button aria-label="Add transaction">+ Add transaction</button>
      </header>

      <div className={styles.options}>
        {["Expenses", "Income", "Saving"].map((option) => (
          <p
            key={option}
            role="button"
            tabIndex={0}
            className={activeTab === option ? styles.active : ""}
            onClick={() => setActiveTab(option)}
            onKeyDown={(e) => e.key === "Enter" && setActiveTab(option)}
          >
            {option}
          </p>
        ))}
      </div>

      <div className={styles.filterContainer}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="11px"
            viewBox="0 0 18 12"
            width="17px"
            aria-hidden="true"
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
          {/* Date Filter */}
          <div className={styles.selectContainer}>
            <select
              name="date"
              value={selectedDate}
              onChange={(e) => handleDateFilter(e.target.value)}
              className={styles.select}
            >
              <option value="">All Dates</option>
              {getUniqueMonthsAndYears.map(({ month, year }) => {
                const monthYearDates = uniqueDates.filter((date) => {
                  const dateObj = new Date(date);
                  return (
                    dateObj.getMonth() + 1 === month &&
                    dateObj.getFullYear() === year
                  );
                });

                return (
                  <optgroup key={`${month}-${year}`} label={`${month}/${year}`}>
                    {monthYearDates.map((date) => (
                      <option key={date} value={date}>
                        {date}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>
          </div>

          {/* Name Filter */}
          <div className={`${styles.nameFilter} ${styles.selectContainer}`}>
            <p role="button" tabIndex={0} onClick={() => setNameSelected(!nameSelected)}>
              Name
            </p>
            {nameSelected && (
              <div className={styles.nameSelectContainer}>
                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {uniqueTransactionNames
                  .filter((name) =>
                    name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((transactionName) => (
                    <p
                      key={transactionName}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleNameFilter(transactionName)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleNameFilter(transactionName)
                      }
                    >
                      {transactionName}
                    </p>
                  ))}
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className={styles.selectContainer}>
            <select
              name="category"
              value={selectedCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className={styles.select}
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Render Filtered Transactions */}
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
            {filteredTransactions.map((transaction: Transaction) => {
              const transactionDate = new Date(transaction.date);
              const formattedDate = `${transactionDate.getDate()}.${transactionDate.getMonth() + 1}.${transactionDate.getFullYear()}`;

              // Determine hover class based on category
              const hoverClass =
                transaction.category.toLowerCase() === "income"
                  ? styles.incomeHover
                  : transaction.category.toLowerCase() !== "saving"
                  ? styles.expenseHover
                  : styles.savingHover;

              return (
                <tr key={transaction._id} className={hoverClass}>
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