import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native-web";
import TransactionSummary from "./TransactionSummary";
import TransactionList from "./TransactionList";
import { GlobalStyles } from "../../constants/style";

const TransactionsOutput = ({
  transactions,
  transactionsPeriod,
  fallBackText,
}) => {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>;

  if (transactions.length > 0) {
    content = <TransactionList transactions={transactions} />;
  }

  return (
    <View style={styles.container}>
      <TransactionSummary
        periodName={transactionsPeriod}
        transactions={transactions}
      />
      {content}
    </View>
  );
};

export default TransactionsOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    margin: 32,
  },
});
