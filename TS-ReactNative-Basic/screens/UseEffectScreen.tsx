import React, { useEffect, useMemo, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { styles } from "../styles/styles";
import { plog } from "../utils/utils";
import { PressableTxt } from "../component";
// useEffect Lifecycle
// Component => React => Browser

const pp = "yes" // printing

export function UseEffectScreen() {
  plog("\nSTART",pp);

  // run once
  useEffect(() => {
    plog("run Once: Run once",pp);
  }, []);

  // see lifecycle
  const [number, setNumber] = useState(0);
  useEffect(() => {
    plog("useEffect: useEffect runs",pp);
    plog(`useEffect: useEffect num ${number}`,pp);
  }, [number]);
  plog("useEffect: component renders",pp);

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
    plog(`useMemo: login name ${login.name}`,pp);
  };
  const handleSel = () => {
    setLogin((prev) => ({ ...prev, selected: true }));
    plog(`useMemo: login selected ${login.selected}`,pp);
  };


  // cleanup function
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    plog("cleanup: effect runs",pp);
    
  return ()=>{
    plog("cleanup: wait before running the effect i should clean here",pp);
    plog("cleanup: done, you can run now",pp);
  }
  }, [toggle])
  
  // timer

  const [count, setCount] = useState(0)  
  useEffect(() => {
    const interval = window.setInterval(()=>setCount((prev)=>prev+1),500)
  
    return () => {
      plog("timer: wait before running the effect i should clean here",pp);
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

      {/* USER MEMO */}
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
