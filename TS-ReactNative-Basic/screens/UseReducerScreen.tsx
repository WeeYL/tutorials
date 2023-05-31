import React, { useReducer, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { styles } from "../styles/styles";
import { plog } from "../utils/utils";

const pp = "yes" // printing

export function UseReducerScreen() {

  // ENUM
  enum ACTION {
    INCREASE = "INCREASE",
    DECREASE = "DECREASE",
  }

  // INITIAL STATE
  const INITIAL_STATE = {
    count: 0,
  };

  // FORM REDUCER
  // set action types
  const countReducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTION.INCREASE: {
        plog(`count: countState ${state.count}`,pp)
        return { count: state.count + 1 };
      }
      case ACTION.DECREASE: {
        if (state.count - 1 <= 0) return { count: 0 };
        else return { count: state.count - 1 };
      }
      default:
        return state;
    }
  };

  // FUNCTIONS
  function handleIncrease() {
    dispatch({ type: ACTION.INCREASE });
  }
  function handleDecrease() {
    dispatch({ type: ACTION.DECREASE });
  }
  // USE REDUCER
  const [state, dispatch] = useReducer(countReducer, INITIAL_STATE);

  // ####
  // eg 2
  // ####
  enum TEXT {
    SUBMIT = "SUBMIT",
  }

  const TEXT_IITIAL_STATE = {
    text:"empty"
  }

  const textReducer = (textState: any, action: any) => {
    switch (action.type) {
      case TEXT.SUBMIT: {
        plog(`textInput: textState: ${textState.text}`,pp)
        plog(`textInput: action.payload.text: ${action.payload.text}`,pp)
        return {...textState, text:action.payload.text}
      }
      default:
        return textState;
    }
  };

  function handleTextChange(e: string) {
    textDispatch({
      type: TEXT.SUBMIT,
      payload: { text: e },
    });
  }

  const [textState, textDispatch] = useReducer(textReducer, TEXT_IITIAL_STATE);
  const [displayText, setDisplayText] = useState("empty")

  return (
    <View>
      <View>
        <Button
          title="+"
          onPress={() => {
            handleIncrease();
          }}
        />
        <Text>count {state.count}</Text>
        <Button
          title="-"
          onPress={() => {
            handleDecrease();
          }}
        />
      </View>

      {/* EXAMPLE 2 */}
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={(e: string) => {
            handleTextChange(e);
          }}
        />
        <Button
          title="update text on screen"
          onPress={() => {setDisplayText(textState.text)}}
        />
      </View>
      <Text>{displayText}</Text>
    </View>
  );
}
