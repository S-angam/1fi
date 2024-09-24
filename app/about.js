import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter, Link } from "expo-router";
import { useEffect, useState } from "react";

export default function App() {
  const router = useRouter();
  // Retrieve the parameters sent via Link
  const { username } = useLocalSearchParams();
  const [phoneEmail, setPhoneEmail] = useState("");
  const [name, setName] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    setUserID(username);
  }, [username]);

  // fetch the user details
  useEffect(() => {
    fetch(`http://petrichor.ideavault.cloud/user/${username}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data["message"][0]);
        setName(data["message"][0]);
        setPhoneEmail(data["message"][1]);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textView}>
        Welcome{" "}
        <Text
          style={{
            color: "black",
            fontSize: 30,
          }}
        >
          {name}
        </Text>
      </Text>
      <Link href="/login">Back</Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  textView: {
    fontSize: 40,
    color: "black",
  },
});
