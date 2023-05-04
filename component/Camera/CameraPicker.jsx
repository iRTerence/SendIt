import React, { useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { BarCodeScanner } from "expo-barcode-scanner";
import { GlobalStyles } from "../../constants/style";

const CameraPicker = () => {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const [cameraImage, setCameraImage] = useState();
  const [showBarCodeScanner, setShowBarCodeScanner] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permission to use this app."
      );
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setCameraImage(image.uri);
  }

  function handleBarCodeScanned({ type, data }) {
    setScannedData(data);
    setShowBarCodeScanner(false);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
  }

  let imagePreview = <Text>No image taken yet</Text>;

  if (cameraImage) {
    imagePreview = <Image source={{ uri: cameraImage }} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Button title="Take Image" onPress={takeImageHandler} />
      <Button
        title="Scan QR Code"
        onPress={() => setShowBarCodeScanner(true)}
      />
      {scannedData && <Text>Scanned data: {scannedData}</Text>}

      {showBarCodeScanner && (
        <View style={styles.barcodeScannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={styles.barcodeScanner}
          />
        </View>
      )}
      {showBarCodeScanner && (
        <View style={styles.backButton}>
          <Button
            title="Back"
            onPress={() => setShowBarCodeScanner(false)}
            style={styles.backButton}
          />
        </View>
      )}
    </View>
  );
};

export default CameraPicker;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  barcodeScannerContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  barcodeScanner: {
    height: height,
    width: width,
  },

  backButton: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    padding: 0,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  backButtonText: {
    color: "#000000",
    fontSize: 16,
  },
});
