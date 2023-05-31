import { Text, View } from "react-native";
import { styles } from "../styles/styles";
import { PressableTxt } from "../component";

export function HomeScreen({ navigation }: any) {
  const detailList = {
    itemId: "123",
    otherParam: "Toys",
  };

  const flatListItemFromHome = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
  ];

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <PressableTxt
        title="Detail"
        onPress={
          () => navigation.navigate("Detail", {detailList:detailList, flatListItemFromHome:flatListItemFromHome}) // pass params to route. item and object
        }
      />
      <PressableTxt
        title="UseEffect"
        onPress={() => navigation.navigate("UseEffect")} // user Effect
      />
      <PressableTxt
        title="API"
        onPress={() => navigation.navigate("API")} // user Effect
      />
        <PressableTxt
        title="State"
        onPress={() => navigation.navigate("State")} // user Effect
      />
        <PressableTxt
        title="UseReducer"
        onPress={() => navigation.navigate("UseReducer")} // user Effect
      />
    </View>
  );
}
