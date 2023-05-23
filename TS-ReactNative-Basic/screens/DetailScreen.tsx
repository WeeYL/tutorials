import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Button, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import {styles} from '../styles/styles'

export function DetailScreen({route}:any) {
  const { itemId, otherParam } = route.params
    return (
        <View style={styles.container}>
        <Text>Detail Screen</Text>
        <Text> Id: {itemId}</Text>
        <Text> otherParam: {otherParam}</Text>
      </View>
    );
  }