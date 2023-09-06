import { StyleSheet, Text, View } from "react-native";

export function DetailsScreen({route}) {
    const {red, green, blue} = route.params
    return (
        <View style={[
            styles.container,
            {backgroundColor:`rgb(${red}, ${green}, ${blue})`}
        ]}>
            <Text style={styles.detailText}>red:{red}</Text>
            <Text style={styles.detailText}>green:{green}</Text>
            <Text style={styles.detailText}>blue:{blue}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
    },
    list: {
      width: "100%",
    },
    detailText:{
        fontSize:24,
        marginBottom:20
    }
   });
   