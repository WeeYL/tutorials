import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import {
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { styles } from "../styles/styles";

export function DetailScreen({ route }: any) {
  const { itemId, otherParam, flatListItemFromHome } = route.params;
  console.log(flatListItemFromHome)
  const flatListItem = [
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
      <SafeAreaView style={styles.container} >

      <Text>Detail Screen</Text>
      <Text> Id: {itemId}</Text>
      <Text> otherParam: {otherParam}</Text>

      <FlatList
        data={flatListItem}
        renderItem={({item}) => <Button title={item.title} />}
        keyExtractor={item => item.id}
      />


    </SafeAreaView>
  );
}
