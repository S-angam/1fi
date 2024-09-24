import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link, Redirect, useRouter } from "expo-router";
import { useEffect } from "react";

export default function App() {
  const router = useRouter(); // Use the router for navigation

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login"); // Navigate to the "about" page after 3 seconds
    }, 3000);

    // Clean up the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Text style={styles.textView}>Welcome to 1FI</Text>
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
  },
});
