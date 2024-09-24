import { Link, Redirect, useRouter } from "expo-router"; // Updated to use useRouter
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  Alert,
} from "react-native";

export default function Login() {
  const [username, setUsername] = useState(""); // Changed to username
  const [password, setPassword] = useState("");
  const router = useRouter(); // Use the router for navigation

  const handleLogin = async () => {
    try {
      // console.log(username, password);
      const response = await fetch("http://petrichor.ideavault.cloud/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.response === 200) {
        // Login Successful
        router.push({
          pathname: "/about",
          params: { username },
        }); // Navigate to /about with username
      } else if (data.response === 404) {
        // User not found
        Alert.alert("Error", "User not found");
      } else if (data.response === 401) {
        // Invalid Password
        Alert.alert("Error", "Invalid password");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while logging in");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textView}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Email or Phone"
          placeholderTextColor="#888"
          onChangeText={(text) => setUsername(text)} // Update username state
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#888"
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonContainer}>
          <Pressable
            title="Login"
            onPress={handleLogin} // Call handleLogin on press
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                paddingVertical: 15,
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
        <StatusBar style="auto" />
        <Text
          style={{
            color: "black",
            marginTop: 20,
          }}
        >
          Don't have an account?
          <Link
            href="/signup"
            style={{
              fontWeight: "bold",
            }}
          >
            Register
          </Link>
        </Text>
      </View>
      <Link href="/">Back</Link>
      <StatusBar style="auto" />
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
  textView: {
    fontSize: 40,
    color: "black",
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "90%",
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    width: "90%",
    backgroundColor: "black",
    borderRadius: 5,
    overflow: "hidden",
  },
});
