import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageTransaction from "./screens/ManageTransaction";
import RecentTransactions from "./screens/RecentTransactions";
import AllTransactions from "./screens/AllTransaction";
import { GlobalStyles } from "./constants/style";
import Ionicons from "@expo/vector-icons/Ionicons";
import IconButton from "./component/TransactionOutput/UI/IconButton";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function TransactionsOverView() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
          height: 68,
          paddingBottom: 12,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,

        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            // style={{ marginRight: 20 }}
            onPress={() => {
              navigation.navigate("ManageTransactions");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentTransactions"
        component={RecentTransactions}
        options={{
          title: "Recent Transactions",
          tabBarLabrel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllTransactions"
        component={AllTransactions}
        options={{
          title: "Total Transactions",
          tabBarLabrel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500,
              },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="TransactionsOverView"
              component={TransactionsOverView}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageTransactions"
              component={ManageTransaction}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});
