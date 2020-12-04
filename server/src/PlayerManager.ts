import Player from './Player';

class PlayerManager {
    public players: {[key: string] : Player}

    constructor() {
        this.players = {}
    }

    register(player: Player) {
        this.players[player.id] = player;
        console.log('Connected: ' + player.id)
    }

    disconnect(id: string) {
        const player = this.players[id];
        if (player) {
            player.onLeave()
        }
        delete this.players[id];
        console.log('Disconnected: ' + id)
    }
}

export default new PlayerManager();