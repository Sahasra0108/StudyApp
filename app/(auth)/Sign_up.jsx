import { SafeAreaView,View, Text,StyleSheet,Image} from 'react-native'
import React from 'react'
import girl from "../../assets/images/signup.png"
import CustomButton from "../../components/CustomButton"
import CustomInput from '../../components/UserInput'
import { useRouter } from 'expo-router'; 

export default function SignIn() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}> 
      <View style={styles.innerContainer}>
      <Image
        style={styles.img}
        source={girl}
      />
       <CustomInput
        label="User Name"
        placeholder="Enter your email"
        //value={email}
        //onChangeText={setEmail}
        keyboardType="email-address"
        //error={emailError}
      />
      <CustomInput
        label="Email"
        placeholder="Enter your email"
        //value={email}
        //onChangeText={setEmail}
        keyboardType="email-address"
        //error={emailError}
      />

    <CustomInput
        label="Password"
        placeholder="Enter your password"
        //value={password}
        //onChangeText={setPassword}
        secureTextEntry={true}
        //error={passwordError}
      />
      <CustomInput
        label="Password"
        placeholder="Confirm your password"
        //value={password}
        //onChangeText={setPassword}
        secureTextEntry={true}
        //error={passwordError}
      />
        
       <View style={styles.button}>
       <CustomButton title="Sign up"/>
       <Text style={styles.text}>Already have an account ?{' '}
        <Text style={styles.link} onPress={() => router.push('(auth)/Sign_in')}>
          Login
        </Text> 
        </Text> 
       </View>
      </View>
    </SafeAreaView> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#E0B0FF',
    padding:10
  },
  innerContainer: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',  
  },
  img:{
    width: 300,  
    height:200,
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
    //color: '#4A90E2',  
    textAlign: 'center',  
    //marginVertical: 20, 
   },
   button: {
    paddingTop:30
   },
   text: {
    paddingTop:15,
    fontSize:16,
    textAlign: 'center',
   },
   link: {
    color: '#9400D3',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }

})
