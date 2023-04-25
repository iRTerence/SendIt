import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import TransactionItem from "./TransactionItem";

function renderTransactionItem(itemData) {
  return <TransactionItem {...itemData.item} />;
}

const TransactionList = ({ transactions }) => {
  return (
    <FlatList
      data={transactions}
      renderItem={renderTransactionItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default TransactionList;

const styles = StyleSheet.create({});
