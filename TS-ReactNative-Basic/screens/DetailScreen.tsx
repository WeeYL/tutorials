import { Button, FlatList, SafeAreaView, Text } from "react-native";
import { styles } from "../styles/styles";

export function DetailScreen({ route }: any) {
  const { detailList, flatListItemFromHome } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Object */}
      <Text>Detail Screen</Text>
      <Text> Id: {detailList.itemId}</Text>
      <Text> otherParam: {detailList.otherParam}</Text>
      
      {/* Flat list */}
      <FlatList
        data={flatListItemFromHome}
        renderItem={({ item }) => <Button title={item.title} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
