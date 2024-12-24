import { SafeAreaView,View, Text,StyleSheet,Image} from 'react-native'
import React from 'react'
import girl from "../assets/images/girl.png"
import CustomButton from "../components/CustomButton"

export default function onboarding() {
  return (
    <SafeAreaView style={styles.container}> 
      <View style={styles.innerContainer}>
      <Image
        style={styles.img}
        source={girl}
      />
       <Text style={styles.title}>Welcome to StudyBuddy!</Text>
       <Text style={styles.subtitle}>Your ultimate companion for goal setting and study success.</Text>
       <View style={styles.button}>
       <CustomButton title="Get Started"/>
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
    width: 450,  
    height:400,
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
    paddingTop:40
   }
})
