import { Server } from "socket.io";
import Player from "./Player";
import playerManager from './PlayerManager'

class SocketManager {
    public io : Server | null = null;
    
    public use(server: Server) {
        this.onConnection = this.onConnection.bind(this);
        this.io = server;
        this.io.on('connection', this.onConnection);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public onConnection(socket: any) {
        const player: Player = new Player(socket);
        playerManager.register(player)

        socket.on('disconnect', () => {
            playerManager.disconnect(socket.id)
        })
    }
}

export default new SocketManager();