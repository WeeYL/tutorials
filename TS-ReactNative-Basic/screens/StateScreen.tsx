import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { styles } from "../styles/styles";
import { plog } from "../utils/utils";

export function StateScreen() {
  // single state
  const [input, setInput] = useState("");
  const [user, setUser] = useState({
    name: "john",
    tel: "123456",
  });

  const updateUser = () => {
    setUser((cur) => ({ ...cur, tel: input })); // update tel with input
  };
  const onChangeTextInput = (e: any) => setInput(e); // set input with text changes in text box

  plog(`single state: \nname: ${user.name} \ntel: ${user.tel}`);

  // multi state
  const [info, setInfo] = useState({
    id: "",
    item: "",
  });

  const onChangeTextInfo = (e: any, arg: string) => {
    // set info based on arg 'id' or 'item'
    if (arg === "id") {
      setInfo((cur) => ({ ...cur, id: e }));
    } else if (arg === "item") {
      setInfo((cur) => ({ ...cur, item: e }));
    }
  };

  plog(`multiple object: \nid: ${info.id} \nitem: ${info.item}`);

  return (
    <View style={styles.container}>
      {/* change single */}
      <TextInput
        style={styles.textInput}
        onChangeText={(e) => onChangeTextInput(e)} // store the input
        value={input}
        placeholder="enter name"
      ></TextInput>
      <Text>{input}</Text>
      <Button title="change tel" onPress={() => updateUser()} />

      {/* change muitple */}

      <TextInput
        style={styles.textInput}
        onChangeText={(e) => onChangeTextInfo(e, "id")} // store the input
        placeholder="enter id"
      ></TextInput>
      <TextInput
        style={styles.textInput}
        onChangeText={(e) => onChangeTextInfo(e, "item")} // store the input
        placeholder="enter item"
      ></TextInput>
    </View>
  );
}
