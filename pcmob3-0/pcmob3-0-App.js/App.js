import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import {names} from './name'

const namesAsObjects = names.map((item=>{
  return {
    name:item,
  }
}))

export default function App() {
  const renderName = ({item}) =>{
    return <Text>{item.name}</Text>
  }
  return (
    <FlatList
    data={namesAsObjects}
    renderItem={renderName}
    keyExtractor={(item)=>item.name}/>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
