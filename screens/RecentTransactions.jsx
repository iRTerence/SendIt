import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import TransactionsOutput from "../component/TransactionOutput/TransactionOutput";
import { useSelector } from "react-redux";
import { fetchTransactions } from "../util/http";
import { useDispatch } from "react-redux";
import { setTransaction } from "../store/redux/transactions";
// import { getDateMinusDays } from "../util/date";
import LoadingOverlay from "../component/TransactionOutput/UI/LoadingOverlay";

const RecentTransaction = () => {
  const [fetchingData, setFetchingData] = useState(true);

  const dispatch = useDispatch();

  function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
  }

  useEffect(() => {
    async function getTransactions() {
      setFetchingData(true);
      let transactions = await fetchTransactions();
      setFetchingData(false);

      // setFetchedTransactions(transactions);
      dispatch(setTransaction({ transactions: transactions }));
    }

    getTransactions();
  }, []);

  const transactionList = useSelector(
    (state) => state.transactions.transactions
  );

  const RecentTransactions = transactionList.filter((transaction) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return transaction.date > date7DaysAgo;
  });

  if (fetchingData) {
    return <LoadingOverlay />;
  }
  return (
    <TransactionsOutput
      transactionsPeriod="Last 7 Days"
      transactions={RecentTransactions}
      fallBackText="No transactions registered for the last 7 days"
    />
  );
};

export default RecentTransaction;

const styles = StyleSheet.create({});
