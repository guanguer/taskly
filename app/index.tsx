import { useEffect, useState } from "react";
import { StyleSheet, TextInput, FlatList, View, Text } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { getFromStorage, saveToStorage } from "../utils/storage";

const storageKey = "taskly-shopping-list";

type ShoppingListItemType = {
  id: string;
  name: string;
  completeAtTimestamp?: number;
  isCompleted?: boolean;
  lastUpdatedTimestamp: number;
};

const initialList: ShoppingListItemType[] = [];

export default function App() {
  const [value, setValue] = useState("");
  const [shoppingList, setShoppingList] =
    useState<ShoppingListItemType[]>(initialList);

  useEffect(() => {
    const fetchInitial = async () => {
      const data = await getFromStorage(storageKey);
      if (data) {
        setShoppingList(data);
      }
    };
    fetchInitial();
  }, []);

  const handleSubmit = () => {
    if (value) {
      const newShoppingList: ShoppingListItemType[] = [
        {
          id: new Date().toISOString(),
          name: value,
          lastUpdatedTimestamp: Date.now(),
        },
        ...shoppingList,
      ];
      setShoppingList(newShoppingList);
      saveToStorage(storageKey, newShoppingList);
      setValue("");
    }
  };
  const handleDelete = (id: string) => {
    const newShoppingList: ShoppingListItemType[] = shoppingList.filter(
      (item) => item.id !== id,
    );
    setShoppingList(newShoppingList);
    saveToStorage(storageKey, newShoppingList);
  };
  const handleToggleComplete = (id: string) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          lastUpdatedTimestamp: Date.now(),
          completeAtTimestamp: item.completeAtTimestamp
            ? undefined
            : Date.now(),
        };
      }
      return item;
    });
    setShoppingList(newShoppingList);
    saveToStorage(storageKey, newShoppingList);
  };
  return (
    <FlatList
      data={orderShoppingList(shoppingList)}
      renderItem={({ item }) => {
        return (
          <ShoppingListItem
            name={item.name}
            isCompleted={Boolean(item.completeAtTimestamp)}
            onDelete={() => handleDelete(item.id)}
            onToggleComplete={() => handleToggleComplete(item.id)}
          />
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

function orderShoppingList(shoppingList: ShoppingListItemType[]) {
  return shoppingList.sort(
    (item1: ShoppingListItemType, item2: ShoppingListItemType) => {
      if (item1.completeAtTimestamp && item2.completeAtTimestamp) {
        return item2.completeAtTimestamp - item1.completeAtTimestamp;
      }
      if (item1.completeAtTimestamp && !item2.completeAtTimestamp) {
        return 1;
      }
      if (!item1.completeAtTimestamp && item2.completeAtTimestamp) {
        return -1;
      }
      if (!item1.completeAtTimestamp && !item2.completeAtTimestamp) {
        return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
      }
      return 0;
    },
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingVertical: 12,
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
