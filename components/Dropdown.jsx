import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function SubjectDropdown ({ subjects, selectedSubject, onSubjectChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a Subject:</Text>
      <Dropdown
        style={styles.dropdown}
        data={subjects}
        labelField="label"
        valueField="value"
        placeholder="Choose a subject"
        value={selectedSubject}
        onChange={(item) => {
          onSubjectChange(item.value);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});


 
