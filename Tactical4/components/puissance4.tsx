import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { bounceInDownJeton } from '../Animations/Animation';
import socket from '../connection';
import Models from '../types/Models';

const columns = [0,1,2,3,4,5,6];
const rows = [1,2,3,4,5,6];

interface Props {
  grid: number[][],
  canPlay: boolean,
  currentPlayer: number,
  scalemuch?: boolean,
  // win: Models.WinState
  gameState?: Models.GameState,
}

export default function Puissance4(props: Props) {

  const {
    grid,
    canPlay,
    currentPlayer,
    // win
    scalemuch,
    gameState,
  } = props;

  const play = React.useCallback((column: number) => {
    console.log(column)
    const playParams : Models.PlayParams = { column }
    socket.emit("Play", playParams, (e: Models.SocketResponse) => { console.log(e)})
  }, [])

  const opacityStatus = React.useCallback((columnIndex: number, rowIndex: number) => {
    if(gameState?.win?.points){
      const points = gameState?.win?.points
      return points.some((point,i) => ((columnIndex === point.x) && (rowIndex === point.y))) ? 1 : 0.3
    }else{
      return 1
    }
    
}, [gameState])
// {opacity:opacityStatus(columnIndex,rowIndex)}

  const createCircle = React.useCallback(() => (
    columns.map((v, columnIndex) => (
      <View key={columnIndex} style={[styles.col,{transform: [{ translateY: -12 }]}]}>
        {rows.map((v2, rowIndex) => {
          const safeRow = grid[columnIndex]
          const value = safeRow.length > rowIndex ? safeRow[rowIndex] : 0;
          if (value === 0) {
            return (
              <TouchableOpacity key={rowIndex} onPress={() => play(columnIndex)}>
                <View style={canPlay ? styles.circlePlace : styles.circleNoPlace} >
                  <View style={canPlay ? styles.circleInnerPlace : null} />
                </View>
              </TouchableOpacity>
            )
          } else {
            return (
              <View key={"1"+ columnIndex + rowIndex} style={[canPlay ? styles.circlePlace : styles.circleNoPlace, {opacity:opacityStatus(columnIndex,rowIndex)}]} >
                <Animatable.View animation={bounceInDownJeton} style={[value === 1 ? styles.circle1 : styles.circle2]} key={rowIndex}>
                  <View style={value === 1 ? styles.circleInner1 : styles.circleInner2} key={rowIndex}/>
                </Animatable.View>
              </View>
            )
          }
        })}
      </View>
    ))
  ), [currentPlayer, canPlay, grid]);
  
  if(scalemuch === true){
    return (
      <View style={[styles.container,{transform: [{ scale: 1.5 }]}]}>
        {createCircle()}
      </View>
    );
  }
  return (
    <View style={[styles.container,{transform: [{ scale: 1 }]}]}>
      {createCircle()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: 'row',
    width: 459,
    height: 300.7,
    justifyContent:'center'
  },
  col: {
    display: 'flex',
    flexDirection: 'column-reverse',
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
  circle1: {
    width: 40,
    height: 40,
    backgroundColor: '#FFCF54',
    borderRadius: 40,
    marginTop: 10.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleInner1: {
    width: 25,
    height: 25,
    borderRadius: 40,
    backgroundColor: '#DEB449',
  },  
  circle2: {
    width: 40,
    height: 40,
    backgroundColor: '#3FCA87',
    borderRadius: 40,
    marginTop: 10.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleInner2: {
    width: 25,
    height: 25,
    borderRadius: 40,
    backgroundColor: '#37B076',
  },
  circlePlace: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 40,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleInnerPlace: {
    width: 25,
    height: 25,
    borderRadius: 40,
    backgroundColor: '#DEDEDE',
  },
  circleNoPlace: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 40,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  }
});