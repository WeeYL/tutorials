import { FunctionComponent, useState, ReactNode } from "react";
import { PressableText } from "./PressableText";
import { Modal, StyleSheet, Text, View } from "react-native";

type ModalProps = {
  children: ReactNode,
  activator?: FunctionComponent<{ // add a fuction
    handleOpen?: () => void;
    handleAlert?: () => void;
  }>;
};

export function DetailModal({ activator: Activator, children }: ModalProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View>
      {/* MODAL CLOSE*/}
      <Modal visible={isModalVisible} transparent={false} animationType="none">
        <View style={styles.centerView}>
          {children}
          <PressableText
            text="close"
            onPress={() => {
              setIsModalVisible(false);
            }}
          />
        </View>
      </Modal>

      {/* INTERACTIVE FOR SCREENDETAILS  */}
      {Activator ? (
        <Activator
          handleOpen={() => setIsModalVisible(true)} // pass func to props
          handleAlert={() => alert("handle alert")}
        />
      ) : (
        <PressableText onPress={() => setIsModalVisible(true)} text="open" />
      )}
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
  size: {
    width: 50,
    height: 50,
  },
});
