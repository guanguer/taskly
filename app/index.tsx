import { useState } from "react";
import { StyleSheet, TextInput, FlatList, View, Text } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingListItem";

type ShoppingListItemType = {
  id: string;
  name: string;
  isCompleted?: boolean;
};

const initialList: ShoppingListItemType[] = [];

export default function App() {
  const [value, setValue] = useState("");
  const [shoppingList, setShoppingList] =
    useState<ShoppingListItemType[]>(initialList);
  const handleSubmit = () => {
    if (value) {
      const newShoppingList: ShoppingListItemType[] = [
        { id: new Date().toISOString(), name: value },
        ...shoppingList,
      ];
      setShoppingList(newShoppingList);
      setValue("");
    }
  };
  return (
    <FlatList
      data={shoppingList}
      renderItem={({ item }) => {
        return (
          <ShoppingListItem name={item.name} isCompleted={item.isCompleted} />
        );
      }}
      ListEmptyComponent={
        <View style={styles.emptyListContainer}>
          <Text>Your shopping list is empty</Text>
        </View>
      }
      ListHeaderComponent={
        <TextInput
          placeholder="E.g. Coffee"
          style={styles.textInput}
          value={value}
          onChangeText={setValue}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      }
      stickyHeaderIndices={[0]}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    padding: 12,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  emptyListContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
  textInput: {
    borderColor: theme.colorLightGray,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
    backgroundColor: theme.colorWhite,
  },
});
