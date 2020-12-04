import Models from "./types/models";
import Player from "./Player";
import RoomManager from "./RoomManager";
import Grid from "./Grid";

export default class Room {
    public readonly code: string;
    public readonly grid: Grid;
    private players: Player[];
    private isStart = false;

    constructor(code: string) {
        this.code = code;
        this.players = [];
        this.grid = new Grid(this);
    }

    join(player: Player) : void {
        this.players.push(player);
        player.setRoom(this);

        this.dispatchEvent<Models.RoomPlayerListChangeEvent>("RoomPlayerListChange", {
            reason: "join",
            playerName: player.name,
            playersName: this.getPlayersName()
        })
    }

    leave(player: Player) : void {
        this.players = this.players.filter((p) => p != player)
        player.setRoom(null);
        if (this.players.length <= 0) {
            RoomManager.deleteRoom(this)
        }

        this.dispatchEvent<Models.RoomPlayerListChangeEvent>("RoomPlayerListChange", {
            reason: "leave",
            playerName: player.name,
            playersName: this.getPlayersName()
        })
        
    }

    onDelete() {
        this.players.forEach((p) => p.setRoom(null))
    }

    getPlayersName() {
        return this.players.map((player) => player.name);
    }

    start() {
        if (!this.isStart) {
            this.isStart = true;
            this.dispatchEvent<Models.RoomStartEvent>("RoomStart", {
                code: this.code
            })
            return true;
        } else {
            return false;
        }
    }

    dispatchEvent<T>(name: string, event: T) {
        this.players.forEach((player) =>
            player.sendEvent<T>(name, event)
        )
    }

    dispatchNewGameState() {
        this.dispatchEvent<Models.GameStateChangeEvent>("GameStateChange", {
            state: this.getStateInfo()
        })
    }

    getStateInfo () : Models.GameState {
        return {
            currentPlayer: this.grid.currentPlayerNumber,
            grid: this.grid.points,
            lastPlacement: this.grid.lastPlacement,
            player1: this.players[0].toInfo(),
            player2: this.players[1].toInfo(),
            score: [0,0]
        }
    }


    getPlayerNumber (player: Player) {
        if ( this.players[0] === player) return 1;
        if ( this.players[1] === player) return 2;
        return 0;
    }
}