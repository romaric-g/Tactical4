import { io } from 'socket.io-client';

//
//http://localhost:4000
const socket = io('https://tactical4.herokuapp.com/');

socket.emit('play')
socket.on('reverseplay', () => {
  console.log('reverseplay')
})


export default socket;