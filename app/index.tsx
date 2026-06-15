import { StyleSheet, View } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Link href="/counter" style={styles.link}>
        Go to Counter
      </Link>
      <ShoppingListItem name="Cappuccino" isCompleted />
      <ShoppingListItem name="Latte" />
      <ShoppingListItem name="Mocha" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: "center",
  },
  link: {
    textAlign: "center",
    marginBottom: 18,
    fontSize: 24,
  },
});
