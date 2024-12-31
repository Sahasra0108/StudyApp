import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/UserInput";
import { useRouter } from "expo-router";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import girl from "../../assets/images/login.png";
import { Ionicons } from "@expo/vector-icons";

export default function Sign_in() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const name = user.displayName;
      console.log(name);

      Alert.alert("Success", "Logged in successfully!");
      router.push(`/Homepage?name=${name}`);
    } catch (error) {
      Alert.alert("Error", "Invalid Email or Password");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <Image style={styles.img} source={girl} />
          <CustomInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <View style={styles.passwordContainer}>
            <CustomInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#9400D3"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <CustomButton title="Login" onPress={handleLogin} />
            <Text style={styles.text}>
              Don't have an account?{" "}
              <Text
                style={styles.link}
                onPress={() => router.push("(auth)/Sign_up")}
              >
                Sign up
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
    paddingTop: 30,
  },
  text: {
    paddingTop: 15,
    fontSize: 16,
    textAlign: "center",
  },
  link: {
    color: "#9400D3",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  img: {
    width: 450,
    height: 400,
    resizeMode: "contain",
    borderRadius: 10,
    margin: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    paddingTop: 25,
  },
});
