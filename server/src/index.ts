import app from './App'
import socketManager from './SocketManager'

const port = process.env.PORT || 4000

app.http.listen(port, () => {
  console.log(`server is listening on ${port}`)
})
socketManager.use(app.io);