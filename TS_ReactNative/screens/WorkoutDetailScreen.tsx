import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { PressableText } from "../components/PressableText";
import { useWorkoutBySlug } from "../hooks/useWorkoutBySlug";

export function WorkoutDetailScreen({route}:{route:NativeStackHeaderProps['route']}) {

  // get workout
  const workout = useWorkoutBySlug((route.params as any).slug);
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      
      <Text style={styles.header}> {workout?.name} </Text>
      <PressableText
        text="Check Sequence"
        onPress={() => {
          setIsModalVisible(true);
        }}
      />

      <Modal visible={isModalVisible} transparent={false} animationType="none">
        <View style={styles.centerView}>
          <Text>hello</Text>
          <PressableText
            text="close"
            onPress={() => {
              setIsModalVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
