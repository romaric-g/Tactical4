import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image  } from 'react-native';

export default function Puissance4() {

    let createCircle = ()=> {
            let nomberCircle = [];
            let nomberCol = [];
            for (let i=0; i<9; i++){
                nomberCol.push(1)
            }
            for (let i=0; i<3; i++){
                nomberCircle.push(1)
            }
            return(
                nomberCol.map((value,index) => (
                    <View key={index} style={styles.col}>
                    {nomberCircle.map((value,index) => (
                        <View key={index} style={styles.circle}>
                            <View key={index} style={styles.circleInner}>
                            
                            </View>
                        </View>
                    ))}
                    </View>
                ))
            );
      }
  return (
    
    <View style={styles.container}>
            {createCircle()}
            <Image
                resizeMode="contain"
                style={styles.grid} 
                source={require('../assets/svggrid.png')}
            />
    <StatusBar style="auto" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 459,
    height: 300.7,
    backgroundColor: '#3B3F4D',
  },
  circle: {
    width: 40,
    height: 40,
    backgroundColor: '#FFCF54',
    borderRadius: 40,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  col: {
    height:'100%',
    marginRight: 12.39,
    justifyContent: 'flex-end',
  },
  grid: {
    height: 309,
    width: 460,
    marginTop: -4,
    position: 'absolute',
  },
  circleInner: {
    width: 25,
    height: 25,
    borderRadius: 40,
    backgroundColor: '#DEB449',
  },
});