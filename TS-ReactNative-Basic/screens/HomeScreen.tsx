import { Text, View } from "react-native";
import { styles } from '../styles/styles';
import { PressableBtn } from "../component";

export function HomeScreen({navigation}:any) {

    const detailList = {
        itemId:"123",
        otherParam:"Toys"
    }

    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <PressableBtn title="Detail !"
        onPress={()=>navigation.navigate("Detail" , detailList) // pass params to route
        }/>
        <PressableBtn title="Timer !"
        onPress={()=>navigation.navigate("Timer")} // user Effect
        /> 
      </View>
    );
  }