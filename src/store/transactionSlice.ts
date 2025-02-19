import { createNewTransaction, getAllTransactions } from "@/res/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface TransactionState {
  name: string;
  category: string;
  wallet: string;
  sum: number;
}

interface InitialState {
  transactions: TransactionState | {};
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  transactions: {},
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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

    builder
      .addCase(getAllTransactionsFromAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllTransactionsFromAPI.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.transactions = action.payload;
        }
      )
      .addCase(getAllTransactionsFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default transactionSlice.reducer;
