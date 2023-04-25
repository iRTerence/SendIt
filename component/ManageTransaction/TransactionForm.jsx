import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Button from "../TransactionOutput/UI/Button";
import { GlobalStyles } from "../../constants/style";

const TransactionForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
  isEditing,
}) => {
  console.log(defaultValues);
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    name: {
      value: defaultValues ? defaultValues.name : "",
      isValid: true,
    },
    accountId: {
      value: defaultValues ? defaultValues.accountId.toString() : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputId, enteredValue) {
    setInputValues((currInputValues) => {
      return {
        ...currInputValues,
        [inputId]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const transactionData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
      name: inputValues.name.value,
      accountId: inputValues.accountId.value,
    };

    const amountIsValid =
      !isNaN(transactionData.amount) && transactionData.amount > 0;
    const dateIsValid = transactionData.date.toString() !== "Invalid Date";
    const descriptionIsValid = transactionData.description.trim().length > 0;
    const nameIsValid = transactionData.name.trim().length > 0;
    const accountIdIsValid = transactionData.accountId.trim().length > 0;

    if (
      !amountIsValid ||
      !dateIsValid ||
      !descriptionIsValid ||
      !nameIsValid ||
      !accountIdIsValid
    ) {
      Alert.alert("Invalid input", "Please check your input values");
      setInputValues((currInputs) => {
        return {
          amount: { value: currInputs.amount.value, isValid: amountIsValid },
          date: { value: currInputs.date.value, isValid: dateIsValid },
          description: {
            value: currInputs.description.value,
            isValid: descriptionIsValid,
          },
          name: { value: currInputs.name.value, isValid: nameIsValid },
          accountId: {
            value: currInputs.accountId.value,
            isValid: accountIdIsValid,
          },
        };
      });
      return;
    } else {
      onSubmit(transactionData);
    }
  }

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid ||
    !inputValues.name.isValid ||
    !inputValues.accountId.isValid;

  return (
    <View style={styles.form}>
      {console.log("here")}

      <Text style={styles.title}>Your Payment</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputValues.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValues.amount.value,
          }}
          isEditing={isEditing}
        />
        <Input
          isEditing={isEditing}
          label="Date"
          style={styles.rowInput}
          invalid={!inputValues.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValues.date.value,
          }}
        />
      </View>
      <View style={styles.inputsRow}>
        <Input
          isEditing={isEditing}
          label="Name"
          invalid={!inputValues.name.isValid}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, "name"),
            value: inputValues.name.value,
          }}
          style={styles.rowInput}
        />

        <Input
          isEditing={isEditing}
          style={styles.rowInput}
          label="Account ID"
          invalid={!inputValues.accountId.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "accountId"),
            value: inputValues.accountId.value,
          }}
        />
      </View>

      <Input
        label="Description"
        invalid={!inputValues.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValues.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default TransactionForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 60,
  },
  rowInput: {
    flex: 1,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
  },
});
