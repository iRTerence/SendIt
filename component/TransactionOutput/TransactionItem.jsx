import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/style";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

const TransactionItem = ({
  id,
  description,
  amount,
  date,
  name,
  accountId,
}) => {
  const navigation = useNavigation();

  function transactionPresshandler() {
    navigation.navigate("ManageTransactions", {
      transactionId: id,
    });
  }

  return (
    <Pressable
      onPress={transactionPresshandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.transactionItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            Name: {name}
          </Text>
          <Text style={styles.textBase}>Date: {getFormattedDate(date)}</Text>
          <Text style={styles.textBase}>Account ID: {accountId}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  transactionItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
