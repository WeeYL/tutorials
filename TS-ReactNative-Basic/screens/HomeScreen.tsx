import { Text, View } from "react-native";
import { styles } from "../styles/styles";
import { PressableBtn } from "../component";

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
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <PressableBtn
        title="Detail !"
        onPress={
          () => navigation.navigate("Detail", detailList, flatListItemFromHome) // pass params to route
        }
      />
      <PressableBtn
        title="Timer !"
        onPress={() => navigation.navigate("Timer")} // user Effect
      />
    </View>
  );
}
