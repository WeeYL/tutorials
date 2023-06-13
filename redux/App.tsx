import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './src/store/store'
import { StyleSheet, Text, View } from 'react-native';
import Message from './src/components/Message';

// show message initial state
// COMPONENT (Message.ts) takes in action / type
// COMPONENT (Message.ts) dispatch to REDUCER
//    REDUCER (message.ts) return the state based on action / type
// COMPONENT (Message.ts) show new state

const App = () => {
  return (
    <Provider store={store}>
          <Message />
    </Provider>
  );
};

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
