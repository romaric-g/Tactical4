import Models from "./types/models";
import Player from "./Player";
import RoomManager from "./RoomManager";

export default class Room {
    public readonly code: string;
    private players: Player[];
    private isStart = false;

    constructor(code: string) {
        this.code = code;
        this.players = [];
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
}