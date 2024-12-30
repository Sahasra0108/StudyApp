import { SafeAreaView, View, Text, StyleSheet, Alert,Image,ScrollView} from 'react-native';
import React, { useState } from 'react';
import CustomButton from "../../components/CustomButton";
import CustomInput from '../../components/UserInput';
import { useRouter } from 'expo-router';
import { auth } from '../firebase';  
import { signInWithEmailAndPassword } from 'firebase/auth';
import girl from "../../assets/images/login.png"

export default function Sign_in() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
       
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user)
      
       
      Alert.alert('Success', 'Logged in successfully!');
      router.push('/Homepage');  
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error','Invalid Email or Password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
      <Image
        style={styles.img}
        source={girl}
      />
        <CustomInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <CustomInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <View style={styles.button}>
          <CustomButton title="Login" onPress={handleLogin} />
          <Text style={styles.text}>
            Don't have an account?{' '}
            <Text style={styles.link} onPress={() => router.push('(auth)/Sign_up')}>
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
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
  img:{
    width: 450,  
    height:400,
    resizeMode: 'contain',  
    borderRadius: 10,  
    margin: 20,   

  },
});
