import { useState } from "react";
import { PressableText } from "./PressableText";
import { Modal, StyleSheet, Text, View } from "react-native";

export function DetailModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View>

      <PressableText
        text="close"
        onPress={() => {
          setIsModalVisible(false);
        }}
      />
      
      <Modal visible={isModalVisible} transparent={false} animationType="none">
        <View style={styles.centerView}>
          <Text>hello</Text>

          <PressableText
            text="Check Sequence"
            onPress={() => {
              setIsModalVisible(true);
            }}
          />
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
});
