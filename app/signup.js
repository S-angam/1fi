import { useRouter, Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";

export default function Login() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [emailPhone, setemailPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.textView}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Full Name"
          placeholderTextColor="#888"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email or Phone"
          placeholderTextColor="#888"
          onChangeText={(text) => setemailPhone(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#888"
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Repeat Password"
          secureTextEntry
          placeholderTextColor="#888"
          onChangeText={(text) => setRepeatPassword(text)}
        />
        <View style={styles.buttonContainer}>
          <Pressable
            title="Register"
            color="#fff"
            onPress={() => {
              if (password !== repeatPassword) {
                alert("Password did not match");
              } else {
                // Assuming you will send data to backend or handle form submission here.
                router.push({
                  pathname: "/otp",
                  params: {
                    name,
                    emailPhone,
                    password,
                  },
                });
              }
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                paddingVertical: 15,
              }}
            >
              Register
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
          Already have an account?
          <Link
            href="/login"
            style={{
              fontWeight: "bold",
            }}
          >
            Login
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
