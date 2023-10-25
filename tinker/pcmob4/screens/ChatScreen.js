import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, db } from "../firebase";

const messageCollection = collection(db, "messages");

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(messageCollection, (collectionSnapshot) => {
      const messages = collectionSnapshot.docs.map((doc) => {
        const date = doc.data().createdAt.toDate();
        const newDoc = { ...doc.data(), createdAt: date };
        return newDoc;
      });
      setMessages(messages);
    });

    onAuthStateChanged(auth, (user) => {
      if (user) navigation.navigate("Chat", { id: user.id, email: user.email });
      else navigation.navigate("Login");
    });

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logout}>
          <MaterialCommunityIcons name="logout" size={30} color="grey" />
        </TouchableOpacity>
      ),
    });

    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  function sendMessages(newMessages) {
    console.log(newMessages);
    addDoc(messageCollection, newMessages[0]);
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={sendMessages}
      listViewProps={{ style: { backgroundColor: "grey" } }}
      user={{ _id: 1 }}
    />
  );
}
