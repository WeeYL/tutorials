import { StyleSheet } from 'react-native';
import { useCachedResources } from './hooks';
import Navigation from './navigation';

export default function App() {
  // useCachedResources()
  return (
    <>
      <Navigation/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
