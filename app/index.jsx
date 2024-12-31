import { SafeAreaView, View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import girl from "../assets/images/girl.png";
import CustomButton from "../components/CustomButton";
import { useRouter } from "expo-router";

export default function onboarding() {
  const router = useRouter();
  const handleGetStarted = () => {
    router.push("(auth)/Sign_in");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.img} source={girl} />
        <Text style={styles.title}>Welcome to BookBridge!</Text>
        <Text style={styles.subtitle}>
          Bridging the gap between curiosity and understanding, one page at a
          time.
        </Text>
        <View style={styles.button}>
          <CustomButton title="Get Started" onPress={handleGetStarted} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0B0FF",
    padding: 10,
  },
  innerContainer: {
    flex: 1,

    alignItems: "center",
  },
  img: {
    width: 450,
    height: 400,
    resizeMode: "contain",
    borderRadius: 10,
    margin: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#9400D3",
    textAlign: "center",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",

    textAlign: "center",
  },
  button: {
    paddingTop: 40,
  },
});
