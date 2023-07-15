import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setMessage, setIndex} from '../store/message';



const Message = () => {
  // UseSelector and UseDispatch
  const { message } = useSelector((state:RootState) => state.message); // holds the current state
  const { index } = useSelector((state:RootState) => state.message); 
  console.log(message)
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(setMessage('Message from Component')); // type: setMessage and payload  
  };
  const handleIndex = () => {
    dispatch(setIndex(10));  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Text style={styles.text}>{index}</Text>
      <Button title={'Set Message'} onPress={handlePress} />
      <Button title={'Set Index'} onPress={handleIndex} />

    </View>
  );
};

export default Message

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    text: {
      fontSize: 18
    }
  });
  