import { Pressable, PressableProps, Text } from "react-native";
import { styles } from "../styles/styles";

export function PressableBtn(props: PressableProps & { title: string }) {
  return (
    <Pressable
      style={styles.button}
      {...props}
    >
      <Text>{props.title}</Text>
    </Pressable>
  );
}
