import { FunctionComponent, useState } from "react";
import { PressableText } from "./PressableText";
import { Modal, StyleSheet, Text, View } from "react-native";

type ModalProps = {
    activator?:FunctionComponent 
}

export function DetailModal({activator:Activator}:ModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View>
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

      { Activator ? <Activator/> : 
      <PressableText
        onPress={()=>setIsModalVisible(true)}
        text="open"
      />
      }
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
