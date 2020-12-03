import { io } from 'socket.io-client';

const socket = io('http://localhost:4000/');

socket.emit('play')
socket.on('reverseplay', () => {
  console.log('reverseplay')
})


export default socket;