import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function OTP() {
  const router = useRouter();

  // Retrieve the parameters sent via Link
  const { name, emailPhone, password = "" } = useLocalSearchParams();
  const [phoneEmail, setPhoneEmail] = useState("");
  // Log the parameters to the console
  useEffect(() => {
    setPhoneEmail(emailPhone);
  }, [name, emailPhone, password]);

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  useEffect(() => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    // Alert.alert("OTP", `Your OTP is ${newOtp}`);
    // print the fetch response which returns {message: "OTP sent"}
    fetch("http://petrichor.ideavault.cloud/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailPhone, otp: newOtp }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, []);

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      console.log("OTP verified");
      fetch("http://petrichor.ideavault.cloud/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username: phoneEmail, password }),
      })
        .then((response) => {
          response.json();
        })
        .then((data) => {
          Alert.alert("Success", "Account created successfully");
          router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert("Error", "Invalid OTP");
    }
  };
  const resendOtp = () => {
    console.log(123);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textView}>Verification</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter OTP"
          placeholderTextColor="#888"
          keyboardType="numeric"
          textAlign="center"
          onChangeText={(text) => {
            setOtp(text);
          }}
          value={otp}
        />
        <View style={styles.buttonContainer}>
          <Pressable onPress={verifyOtp}>
            <Text style={styles.buttonText}>Verify</Text>
          </Pressable>
        </View>
        <StatusBar style="auto" />
        <Text style={styles.resendText}>
          Resend OTP?{" "}
          <Pressable onPress={resendOtp}>
            <Text style={styles.resendLink}>Click Here</Text>
          </Pressable>
        </Text>
        {/* <Text>{generatedOtp}</Text> */}
      </View>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.backLink}>Back</Text>
      </Pressable>
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
    marginBottom: -120,
    padding: 30,
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
  buttonText: {
    color: "white",
    textAlign: "center",
    paddingVertical: 15,
  },
  resendText: {
    color: "black",
    marginTop: 20,
  },
  resendLink: {
    fontWeight: "bold",
  },
  backLink: {
    marginTop: 20,
    color: "black",
  },
});
