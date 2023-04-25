import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TransactionsOutput from "../component/TransactionOutput/TransactionOutput";
import { useSelector } from "react-redux";

const AllTransaction = () => {
  const transactionList = useSelector(
    (state) => state.transactions.transactions
  );

  console.log(transactionList);

  return (
    <TransactionsOutput
      transactionsPeriod="Total"
      transactions={transactionList}
      fallBackText="No transactions found!"
    />
  );
};

export default AllTransaction;

const styles = StyleSheet.create({});
