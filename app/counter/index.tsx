import { Text, View, StyleSheet } from "react-native";
import { theme } from "../../theme";

export default function ConterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Counter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  },
  text: {
    fontSize: 24,
  },
  link: {
    textAlign: "center",
    marginBottom: 18,
    fontSize: 24,
  },
});
