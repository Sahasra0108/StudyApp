import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity,Text} from 'react-native';

export default function CustomButton({ title, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
         <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({   
  button: {
    width:300,
    height:50,
    padding: 10,
    borderRadius:20,
    backgroundColor: '#9400D3',   
     
  },
  text:{
    color:"white",
    fontWeight:"bold",
    textAlign:"center",
    fontSize:20
  }
});
