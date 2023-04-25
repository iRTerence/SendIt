import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
  },
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push({ ...action.payload });
    },
    removeTransaction: (state, action) => {
      console.log(action.payload.id);
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions.splice(index, 1);
      }
    },
    updateTransaction: (state, action) => {
      const { id, data } = action.payload;
      const updatableTransactionIndex = state.transactions.findIndex(
        (transaction) => transaction.id === id
      );

      if (updatableTransactionIndex >= 0) {
        state.transactions[updatableTransactionIndex] = {
          ...state.transactions[updatableTransactionIndex],
          ...data,
        };
      }
    },
    setTransactions: (state, action) => {
      const invertedArray = action.payload.transactions.reverse();
      state.transactions = invertedArray;
    },
  },
});

export const addTransaction = transactionSlice.actions.addTransaction;
export const removeTransaction = transactionSlice.actions.removeTransaction;
export const updateTransaction = transactionSlice.actions.updateTransaction;
export const setTransaction = transactionSlice.actions.setTransactions;

export default transactionSlice.reducer;
