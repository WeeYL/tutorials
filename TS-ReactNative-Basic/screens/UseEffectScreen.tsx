import React, { useEffect, useMemo, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { styles } from "../styles/styles";
import { plog } from "../utils/utils";
import { PressableTxt } from "../component";
// useEffect Lifecycle
// Component => React => Browser

export function UseEffectScreen() {
  plog("\nSTART");

  // run once
  useEffect(() => {
    plog("run Once: Run once");
  }, []);

  // see lifecycle
  const [number, setNumber] = useState(0);
  useEffect(() => {
    plog("useEffect: useEffect runs");
    plog(`useEffect: useEffect num ${number}`);
  }, [number]);
  plog("useEffect: component renders");

  const [name, setName] = useState("");
  const [login, setLogin] = useState({
    name: name,
    selected: false,
  });

  // useMemo
  const User = useMemo(() => ({login}),[login.name,login.selected]) // because of memory allocation. For non-primitive eg, list, object, use useMemo
  
  useEffect(() => {
    console.log("useMemo: User Login has changed")
  }, [User])
  
  const handleAdd = () => {
    setLogin((prev) => ({ ...prev, name }));
    plog(`useMemo: login name ${login.name}`);
  };
  const handleSel = () => {
    setLogin((prev) => ({ ...prev, selected: true }));
    plog(`useMemo: login selected ${login.selected}`);
  };


  // cleanup function
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    plog("cleanup: effect runs")
    
  return ()=>{
    plog("cleanup: wait before running the effect i should clean here")
    plog("cleanup: done, you can run now")
  }
  }, [toggle])
  
  // timer

  const [count, setCount] = useState(0)  
  useEffect(() => {
    const interval = window.setInterval(()=>setCount((prev)=>prev+1),500)
  
    return () => {
      plog("timer: wait before running the effect i should clean here")
      clearInterval(interval)
    }
  }, [])
  

  return (
    <View style={styles.container}>
      <Text>Detail Screen</Text>

      {/* INCREMENT */}
      <Text>Increment</Text>
      <PressableTxt
        title={`${number}`}
        onPress={() => setNumber((prev) => prev + 1)}
      ></PressableTxt>

      {/* TEXTBOX */}
      <Text>TextBox</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(e) => setName(e)}
        value={name}
        placeholder="enter name"
      ></TextInput>
      <View>
        <Button
          title="add name"
          onPress={() => {
            handleAdd();
          }}
        />
        <Button
          title="select"
          onPress={() => {
            handleSel();
          }}
        />
      </View>
      
      {/* USEEFFECT */}
      <View>
        <Button
        title="toggle"
        onPress={()=>{setToggle(!toggle)
        plog(`toggle: ${toggle}`)}}
        />
      <Text> 
        {/* without clean up, amending text will cause the counter to speed up / run multiple instance */}
        Counter: {count} s
      </Text>
      </View>

    </View>
  );
}
