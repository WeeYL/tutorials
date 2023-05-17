import { Pressable, PressableProps, Text, View } from "react-native";

export function PressableText(props: PressableProps & { text: string }) {

  return (
    // import props functionality and add the props params
    <View>
      <Pressable {...props}>
        <Text style={{ textDecorationLine: "underline" }}>{props.text}</Text>
      </Pressable>

    </View>
  );
}
