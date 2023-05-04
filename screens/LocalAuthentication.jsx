import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export default function LocalAuthentication() {
  const [authenticationResult, setAuthenticationResult] = useState(null);

  async function handleAuthentication() {
    const result = await LocalAuthentication.authenticateAsync();
    setAuthenticationResult(result.success ? "Success" : "Failure");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biometric Authentication Example</Text>
      <Button title="Authenticate" onPress={handleAuthentication} />
      {authenticationResult !== null && (
        <Text style={styles.result}>
          Authentication result: {authenticationResult}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
  },
});
