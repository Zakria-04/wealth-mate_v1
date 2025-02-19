import {
  createNewTransaction,
  getAllTransactions,
  getTransactionSummary,
} from "@/res/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { get } from "http";

export const createTransactionFromAPI = createAsyncThunk(
  "create/transaction",
  async (body: any, { rejectWithValue }) => {
    try {
      const response = await createNewTransaction(body);
      return response;
    } catch (error: any) {
      console.error("Transaction Error:", error);
      return rejectWithValue(error.message || "Transaction failed");
    }
  }
);

export const getAllTransactionsFromAPI = createAsyncThunk(
  "get/transactions",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await getAllTransactions(token);
      return response;
    } catch (error: any) {
      console.error("Transaction Error:", error);
      return rejectWithValue(error.message || "Transaction failed");
    }
  }
);

export const getTransactionSummaryFromAPI = createAsyncThunk(
  "get/transaction-summary",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await getTransactionSummary(token);
      return response;
    } catch (error: any) {
      console.error("Transaction Error:", error);
      return rejectWithValue(error.message || "Transaction failed");
    }
  }
);

interface TransactionState {
  _id?: string;
  date?: any;
  name: string;
  category: string;
  wallet: string;
  sum: number;
}

interface InitialState {
  transactions: TransactionState[] | null;
  loading: boolean;
  error: string | null;
  totalBalance: number;
  income: number;
  expenses: number;
  savings: number;
}

const initialState: InitialState = {
  transactions: [],
  loading: false,
  error: null,
  totalBalance: 0,
  income: 0,
  expenses: 0,
  savings: 0,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create transaction
    builder
      .addCase(createTransactionFromAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createTransactionFromAPI.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.transactions = action.payload;
        }
      )
      .addCase(createTransactionFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // get all transactions
    builder
      .addCase(getAllTransactionsFromAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllTransactionsFromAPI.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.transactions = action.payload.transactions;
        }
      )
      .addCase(getAllTransactionsFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // get transaction summary
    builder
      .addCase(getTransactionSummaryFromAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getTransactionSummaryFromAPI.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.totalBalance = action.payload.balance;
          state.income = action.payload.income;
          state.expenses = action.payload.expenses;
          state.savings = action.payload.savings;
        }
      )
      .addCase(getTransactionSummaryFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default transactionSlice.reducer;
