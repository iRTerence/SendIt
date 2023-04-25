import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import IconButton from "../component/TransactionOutput/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  removeTransaction,
  updateTransaction,
} from "../store/redux/transactions";
import TransactionForm from "../component/ManageTransaction/TransactionForm";
import {
  storeTransactions,
  updateTransactions,
  deleteTransactions,
} from "../util/http";
import LoadingOverlay from "../component/TransactionOutput/UI/LoadingOverlay";

const ManageTransaction = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editTransactionId = route.params?.transactionId;
  const isEditing = !!editTransactionId;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Payment" : "Add Payment",
    });
  }, [navigation, isEditing]);

  const transactionList = useSelector(
    (state) => state.transactions.transactions
  );

  const selectedTransaction = transactionList.find(
    (expense) => expense.id === editTransactionId
  );

  function deleteTransactionHandler() {
    setIsSubmitting(true);
    dispatch(removeTransaction({ id: route.params.transactionId }));
    deleteTransactions(editTransactionId);
    navigation.goBack();
  }
  function cancelHandler() {
    setIsSubmitting(true);

    navigation.goBack();
  }
  async function confirmHandler(transactionData) {
    setIsSubmitting(true);

    if (isEditing) {
      dispatch(
        updateTransaction({ data: transactionData, id: editTransactionId })
      );
      await updateTransactions(editTransactionId, transactionData);
    } else {
      const id = await storeTransactions(transactionData);
      dispatch(addTransaction({ ...transactionData, id: id }));
    }

    navigation.goBack();
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <TransactionForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectedTransaction}
        isEditing={isEditing}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteTransactionHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
