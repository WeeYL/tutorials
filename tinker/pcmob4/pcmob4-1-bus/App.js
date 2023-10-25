import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [next2Arrival, setNext2Arrival] = useState("");

  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";
  const Bus = 155;
  function loadBusStopData() {
    setLoading(true)
    fetch(BUSSTOP_URL)
      .then((response) => response.json())
      .then((json) => {
        const myBus = json.services.filter((bus) => bus.no == Bus)[0];
        console.log(myBus.next.time);

        const hours = new Date(myBus.next.time).getHours() + 8;
        const minutes = new Date(myBus.next.time).getMinutes();
        setArrival(`${hours}: ${minutes}`);

        const nextTime = new Date(myBus.next.time).getTime();
        const next2Time = new Date(myBus.next2.time).getTime();
        const nextArrival = Math.ceil((next2Time - nextTime) / (60 * 60 * 60))
        setNext2Arrival(nextArrival)
        setLoading(false);
      });
  }

  useEffect(() => {
    loadBusStopData();
    const interval = setInterval(loadBusStopData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus {Bus} arrival time: </Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator color={"blue"} /> : `${arrival} \nnext: ${next2Arrival}mins`}
      </Text>
      {/* <Text style={styles.arrivalTime}>next: {next2Arrival}mins</Text> */}
      <TouchableOpacity style={styles.button} onPress={() => setLoading(true)}>
        <Text styles={styles.buttonText}>Refresh </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    marginVertical: 20,
  },
  arrivalTime: {
    fontSize: 25,
  },
  button: {
    backgroundColor: "lightblue",
    padding: 20,
    marginVertical: 20,
  },
  buttonText: { fontSize: 20 },
});
