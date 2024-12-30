import { SafeAreaView, View, Text, StyleSheet, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import girl from "../../assets/images/signup.png";
import CustomButton from "../../components/CustomButton";
import CustomInput from '../../components/UserInput';
import { useRouter } from 'expo-router';
import { auth } from '../firebase'; // Correct import for auth
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Ionicons } from '@expo/vector-icons';

export default function Sign_up() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateFields = () => {
    const newErrors = {};

    if (!username) {
      newErrors.username = 'Username is required.';
    }
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter.';
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = 'Password must contain at least one lowercase letter.';
    } else if (!/\d/.test(password)) {
      newErrors.password = 'Password must contain at least one number.';
    } else if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password = 'Password must contain at least one special character (!@#$%^&*).';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      Alert.alert('Success', 'Account created successfully!');
      router.push('(auth)/Sign_in');
    } catch (error) {
      console.error('SignUp Error:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          style={styles.img}
          source={girl}
        />
        <CustomInput
          label="User Name"
          placeholder="Enter your username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setErrors((prev) => ({ ...prev, username: '' }));
          }}
          error={errors.username}
        />
        <CustomInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors((prev) => ({ ...prev, email: '' }));
          }}
          keyboardType="email-address"
          error={errors.email}
        />
        <View style={styles.passwordContainer}>
          <CustomInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors((prev) => ({ ...prev, password: '' }));
            }}
            secureTextEntry={!showPassword}
            error={errors.password}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#9400D3"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <CustomInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setErrors((prev) => ({ ...prev, confirmPassword: '' }));
            }}
            secureTextEntry={!showConfirmPassword}
            error={errors.confirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword((prev) => !prev)}
          >
            <Ionicons
              name={showConfirmPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#9400D3"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <CustomButton title="Sign up" onPress={handleSignUp} />
          <Text style={styles.text}>
            Already have an account?{' '}
            <Text style={styles.link} onPress={() => router.push('(auth)/Sign_in')}>
              Login
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
    backgroundColor: '#E0B0FF',
    padding: 10
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  img: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
    margin: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#9400D3',
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    paddingTop: 30
  },
  text: {
    paddingTop: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  link: {
    color: '#9400D3',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    paddingTop:25
  }
});
