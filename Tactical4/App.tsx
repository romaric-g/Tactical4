import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Puissance4 from './components/puissance4';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Puissance4></Puissance4>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#04091B',
  },
});
